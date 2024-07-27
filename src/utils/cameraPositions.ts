import { Matrix4 } from "three";

const pitch =  Math.PI / 2 
const topCameraMatrix = new Matrix4()
topCameraMatrix.makeRotationX(-pitch)

const leftCameraMatrix = new Matrix4()
leftCameraMatrix.set(0, 0, 1, 0,
                    -1, 0, 0, 0,
                     0, -1, 0, 0, 
                     0, 0, 0, 1)

const rightCameraMatrix = new Matrix4()
rightCameraMatrix.set(0, 0, -1, 0,
                      1, 0, 0, 0,
                      0, -1, 0, 0, 
                      0, 0, 0, 1)

export const cameraMatrices = [topCameraMatrix, topCameraMatrix, rightCameraMatrix]