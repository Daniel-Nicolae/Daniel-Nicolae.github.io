import { Matrix4, Vector3 } from "three";

const pitch =  Math.PI / 4 
const topCameraMatrix = new Matrix4()
topCameraMatrix.set(1,  0,                0,               0,
                    0,  Math.cos(pitch),  Math.sin(pitch), 0,
                    0, -Math.sin(pitch),  Math.cos(pitch), 0,
                    0,  0,                0,               1)


const yaw = Math.PI / 4
const leftCameraMatrix = new Matrix4()
leftCameraMatrix.set(Math.cos(yaw),  0, Math.sin(yaw), 0,
                     0,              1, 0,             0,
                     -Math.sin(yaw), 0, Math.cos(yaw), 0,
                     0,              0, 0,             1)


const rightCameraMatrix = new Matrix4()
rightCameraMatrix.set(Math.cos(yaw), 0, -Math.sin(yaw), 0,
                     0,              1, 0,              0,
                     Math.sin(yaw),  0, Math.cos(yaw),  0,
                     0,              0, 0,              1)

export const cameraMatrices = [leftCameraMatrix, topCameraMatrix, rightCameraMatrix]