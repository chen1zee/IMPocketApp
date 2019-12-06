import {AudioRecorder, AudioUtils} from "react-native-audio"
import {Platform} from "react-native";
declare namespace AudioRecorder {}
/**
 * 录音
 * */
class RecordSound {
  // 获取路径
  public static createFilePath = (filename: string) => {
    return AudioUtils.DocumentDirectoryPath + "/" + filename + ".aac"
  }
  // 准备录音
  public static prepareRecordPath = (audioPath: string) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    })
  }
  // 录音中 cb
  public static onProgress = (cb: (data: {currentTime: number}) => void) => {
    // @ts-ignore
    AudioRecorder.onProgress = cb
  }
  // 录音结束 cb 在 IOS中使用,,, 安卓通过 AudioRecorder.stopRecording() -> Promise 触发
  public static onFinished = (
    cb: (data: {status: "OK" | "othersUnkown", audioFileURL: string}) => void
  ) => {
    if (Platform.OS != "ios") return // 只有 IOS 才通过回调触发 结束事件
    AudioRecorder.onFinished = cb
  }
  // 开始录音
  public static startRecording = () => AudioRecorder.startRecording()
  // 停止录音 返回 filePath   安卓端 使用此回调
  public static stopRecording: () => Promise<string> = () => AudioRecorder.stopRecording()
  // 移除所有监听器
  public static removeListeners = () => AudioRecorder.removeListeners()
}

export default RecordSound
