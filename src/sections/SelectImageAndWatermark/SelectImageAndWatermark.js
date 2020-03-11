import styles from './SelectImageAndWatermark.module.scss'
import React, { Fragment, useEffect, useState } from 'react'
import cx from 'classnames'
import * as tf from '@tensorflow/tfjs'

import Section from '../../components/Section/Section';
import SubSection from '../../components/SubSection/SubSection';

import { loadPixel } from '../../util/LoadPixel';
import { create2D, reshape3D } from '../../util/ArrayUtil';


import lena from './lena50.png'
import leaf32 from './leaf32.png'
import ImageSketch from '../../components/ImageSketch/ImageSketch';

let N = 50
let P = 25

const SelectImageAndWatermark = ({ className }) => {

  let [embedded, setEmbedded] = useState(null)

  useEffect(() => {
    let embed = async () => {
      window.tf = tf
      let cover = await loadPixel(lena)
      let watermark = await loadPixel(leaf32)
      let cover2 = []
      tf.tidy(()=>{
        let momenRGB = transformPHT(cover, N, P)
        let imgRGB = inversePHT(momenRGB, N, P)
        imgRGB = imgRGB.abs()
        cover2 = imgRGB.dataSync()
      })
      cover2 = reshape3D(cover2, N, N, 4)
      console.log(cover, cover2)
      console.log(tf.memory().numTensors)
      // let ortho = matMulComplex(getMatV(N, P), getMatW(N, P))
      // ortho.abs().print()
      setEmbedded(cover2)
    }
    embed()
  }, [])

  return (
    <Fragment>

      <Section title={'Select Image & Watermark'} className={cx(className, styles.root)}>
        <SubSection className={cx(styles.subsectionMiddle)}>
          <img src={lena} alt='cover' className={cx(styles.coverImage)} />
          <b>Cover Image</b>
        </SubSection>
        <SubSection className={cx(styles.subsectionMiddle)}>
          <img src={leaf32} alt='watermark' className={cx(styles.watermark)} />
          <b>Watermark</b>
        </SubSection>
      </Section>

      <Section title={'Embed Watermark to Cover Image'}>
        <div className={styles.embedded}>
          <ImageSketch imagePixels={embedded} />
          <br />
          <b>Watermarked Image</b>
        </div>
      </Section>

    </Fragment>
  );
}

export default SelectImageAndWatermark;

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const matMulComplex = (matA, matB) => {
  let rere = tf.real(matA).matMul(tf.real(matB))
  let imim = tf.imag(matA).matMul(tf.imag(matB))
  let reim = tf.real(matA).matMul(tf.imag(matB))
  let imre = tf.imag(matA).matMul(tf.real(matB))
  let re = rere.sub(imim)
  let im = reim.add(imre)
  return tf.complex(re, im)
}

const translateIndex = (index) => {
  // ( 2 * index - N + 1 ) / N
  return tf.mul(2, index)
    .sub(N)
    .add(1)
    .div(N)
}

const createMatW = (matR, matT, matN, matM) => {
  let power = tf.mul(2, Math.PI)
    .mul(matN)
    .mul(matR)
    .mul(matR)
    .add(
      tf.mul(matM, matT)
    )
  let C = tf.floor(matR)
  let D = 2 / (Math.PI * N * N)
  let re = tf.cos(power).mul(D).mul(C)
  let im = tf.sin(power.mul(-1)).mul(D).mul(C)
  return tf.complex(re, im)
}

const createMatV = (matR, matT, matN, matM) => {
  let power = tf.mul(2, Math.PI)
    .mul(matN)
    .mul(matR)
    .mul(matR)
    .add(
      tf.mul(matM, matT)
    )
  let re = tf.cos(power)
  let im = tf.sin(power)
  return tf.complex(re, im)
}

const transformPHTPerChannel = (imageChannel, N, P) => {
  let tLen = 2 * P + 1
  let imVec = tf.tensor(imageChannel)
  imVec = tf.reshape(imVec, [N * N, 1])

  let vecN = create2D(tLen, tLen, 1)
  let vecM = create2D(tLen, tLen, 1)
  for (let i = -P; i <= P; i++) {
    vecN[i + P] = vecN[i + P].map(col => i)
    vecM.map(row => {
      row[i + P] = i
      return row[i + P]
    })
  }
  vecN = tf.reshape(vecN, [tLen * tLen, 1])
  vecM = tf.reshape(vecM, [tLen * tLen, 1])

  let vecI = create2D(N, N, 1)
  let vecK = create2D(N, N, 1)
  for (let i = 0; i < N; i++) {
    vecI[i] = vecI[i].map(col => i)
    vecK.map(row => {
      row[i] = i
      return row[i]
    })
  }
  vecI = tf.reshape(vecI, [1, N * N])
  vecK = tf.reshape(vecK, [1, N * N])

  let vecY = translateIndex(vecI)
  let vecX = translateIndex(vecK)

  let vecR = tf.sqrt(vecY.square().add(vecX.square()))
  let vecT = tf.atan2(vecY, vecX)

  let matR = vecR.tile([tLen * tLen, 1])
  let matT = vecT.tile([tLen * tLen, 1])
  let matN = vecN.tile([1, N * N])
  let matM = vecM.tile([1, N * N])

  let matW = createMatW(matR, matT, matN, matM)
  let re = tf.real(matW).matMul(imVec)
  let im = tf.imag(matW).matMul(imVec)
  let momenVec = tf.complex(re, im)
  return momenVec
}

const inversePHTPerChannel = (momenRGB, N, P) => {
  let tLen = 2 * P + 1
  // let momenVec = tf.tensor(momenRGB)
  // momenVec = tf.reshape(momenVec, [N * N, 1])
  let momenVec = momenRGB.clone()

  let vecN = create2D(tLen, tLen, 1)
  let vecM = create2D(tLen, tLen, 1)
  for (let i = -P; i <= P; i++) {
    vecN[i + P] = vecN[i + P].map(col => i)
    vecM.map(row => {
      row[i + P] = i
      return row[i + P]
    })
  }
  vecN = tf.reshape(vecN, [1, tLen * tLen])
  vecM = tf.reshape(vecM, [1, tLen * tLen])

  let vecI = create2D(N, N, 1)
  let vecK = create2D(N, N, 1)
  for (let i = 0; i < N; i++) {
    vecI[i] = vecI[i].map(col => i)
    vecK.map(row => {
      row[i] = i
      return row[i]
    })
  }
  vecI = tf.reshape(vecI, [N * N, 1])
  vecK = tf.reshape(vecK, [N * N, 1])

  let vecY = translateIndex(vecI)
  let vecX = translateIndex(vecK)

  let vecR = tf.sqrt(vecY.square().add(vecX.square()))
  let vecT = tf.atan2(vecY, vecX)

  let matR = vecR.tile([1, tLen * tLen])
  let matT = vecT.tile([1, tLen * tLen])
  let matN = vecN.tile([N * N, 1])
  let matM = vecM.tile([N * N, 1])

  let matV = createMatV(matR, matT, matN, matM)
  return matMulComplex(matV, momenVec)
}

const transformPHT = (image, N, P) => {
  let imageR = image.map(row => row.map(cell => cell[0]))
  let imageG = image.map(row => row.map(cell => cell[1]))
  let imageB = image.map(row => row.map(cell => cell[2]))
  let momenR = transformPHTPerChannel(imageR, N, P)
  let momenG = transformPHTPerChannel(imageG, N, P)
  let momenB = transformPHTPerChannel(imageB, N, P)
  return tf.concat([momenR, momenG, momenB], 1)
}

const inversePHT = (momenRGB, N, P) => {
  let re = tf.real(momenRGB)
  let im = tf.imag(momenRGB)
  let [reR, reG, reB] = tf.split(re, 3, 1)
  let [imR, imG, imB] = tf.split(im, 3, 1)
  let momenR = tf.complex(reR, imR)
  let momenG = tf.complex(reG, imG)
  let momenB = tf.complex(reB, imB)
  let momenA = tf.complex(create2D(1, N*N, 255), create2D(1, N*N, 0),)
  let imageR = inversePHTPerChannel(momenR, N, P)
  let imageG = inversePHTPerChannel(momenG, N, P)
  let imageB = inversePHTPerChannel(momenB, N, P)
  return tf.concat([imageR, imageG, imageB, momenA], 1)
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const getMatW = (N, P) => {
  let tLen = 2 * P + 1

  let vecN = create2D(tLen, tLen, 1)
  let vecM = create2D(tLen, tLen, 1)
  for (let i = -P; i <= P; i++) {
    vecN[i + P] = vecN[i + P].map(col => i)
    vecM.map(row => {
      row[i + P] = i
      return row[i + P]
    })
  }
  vecN = tf.reshape(vecN, [tLen * tLen, 1])
  vecM = tf.reshape(vecM, [tLen * tLen, 1])

  let vecI = create2D(N, N, 1)
  let vecK = create2D(N, N, 1)
  for (let i = 0; i < N; i++) {
    vecI[i] = vecI[i].map(col => i)
    vecK.map(row => {
      row[i] = i
      return row[i]
    })
  }
  vecI = tf.reshape(vecI, [1, N * N])
  vecK = tf.reshape(vecK, [1, N * N])

  let vecY = translateIndex(vecI)
  let vecX = translateIndex(vecK)

  let vecR = tf.sqrt(vecY.square().add(vecX.square()))
  let vecT = tf.atan2(vecY, vecX)

  let matR = vecR.tile([tLen * tLen, 1])
  let matT = vecT.tile([tLen * tLen, 1])
  let matN = vecN.tile([1, N * N])
  let matM = vecM.tile([1, N * N])

  return createMatW(matR, matT, matN, matM)
}

const getMatV = (N, P) => {
  let tLen = 2 * P + 1

  let vecN = create2D(tLen, tLen, 1)
  let vecM = create2D(tLen, tLen, 1)
  for (let i = -P; i <= P; i++) {
    vecN[i + P] = vecN[i + P].map(col => i)
    vecM.map(row => {
      row[i + P] = i
      return row[i + P]
    })
  }
  vecN = tf.reshape(vecN, [1, tLen * tLen])
  vecM = tf.reshape(vecM, [1, tLen * tLen])

  let vecI = create2D(N, N, 1)
  let vecK = create2D(N, N, 1)
  for (let i = 0; i < N; i++) {
    vecI[i] = vecI[i].map(col => i)
    vecK.map(row => {
      row[i] = i
      return row[i]
    })
  }
  vecI = tf.reshape(vecI, [N * N, 1])
  vecK = tf.reshape(vecK, [N * N, 1])

  let vecY = translateIndex(vecI)
  let vecX = translateIndex(vecK)

  let vecR = tf.sqrt(vecY.square().add(vecX.square()))
  let vecT = tf.atan2(vecY, vecX)

  let matR = vecR.tile([1, tLen * tLen])
  let matT = vecT.tile([1, tLen * tLen])
  let matN = vecN.tile([N * N, 1])
  let matM = vecM.tile([N * N, 1])

  return createMatV(matR, matT, matN, matM)
}