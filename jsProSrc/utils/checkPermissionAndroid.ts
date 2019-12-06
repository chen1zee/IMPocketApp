/**
 * 安卓 检测权限
 * */
import {Permission, PermissionsAndroid, Rationale} from "react-native";

type Params = {
  permission: Permission, // 对应的权限
  rationale: Rationale, // 对应 Rationale
}
// 结果 "has": 有权限
type Result = "has" | "refuse"
/**
 * @return 结果 "has"
 * */
async function checkPermissionAndroid({permission, rationale}: Params): Promise<Result> {
  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return "has"
  // 无权限，询问授权
  const result = await PermissionsAndroid.request(permission, rationale)
  if (result === PermissionsAndroid.RESULTS.GRANTED) return "has"
  // 拒绝
  return "refuse"
}

export default checkPermissionAndroid
