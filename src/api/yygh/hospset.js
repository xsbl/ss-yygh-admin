import request from "@/utils/request";

const prefix = "/api8201/admin/hosp/hospitalSet";
export default {
  //医院列表接口
  getHospList(page, limit, searchObj) {
    return request({
      url: `${prefix}/findPageHospitalSet/${page}/${limit}`,
      method: "post",
      data: searchObj,
    });
  },
  deleteHospById(id) {
    return request({
      url: `${prefix}/deleteById/${id}`,
      method: "delete",
    });
  },
  saveHosp(hosp) {
    return request({
      url: `${prefix}/saveHospitalSet`,
      method: "post",
      data: hosp,
    });
  },
  //根据id获取医院详情
  getHospById(id) {
    return request({
      url: `${prefix}/getHospitalSet/${id}`,
      method: "get",
    });
  },
  //更新医院
  updateHospitalSet(hosp) {
    return request({
      url: `${prefix}/updateHospitalSet`,
      method: "post",
      data: hosp,
    });
  },
  batchRemoveHospSet(ids) {
    return request({
      url: `${prefix}/batchRemove`,
      method: "delete",
      data: ids,
    });
  },
  //更新医院状态
  lockHospSet(id, status) {
    return request({
      url: `${prefix}/lockHospital/${id}/${status}`,
      method: "put",
    });
  },
  //根据dict_code查询所有子节点
  findByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: "get",
    });
  },
  //根据id查询下级数据字典
  findByParentId(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: "get",
    });
  },
  //根据医院编号获取医院排班信息
  getDeptByHoscode(hoscode) {
    return request({
      url: `/admin/hosp/department/getDepartLIst/${hoscode}`,
      method: "get",
    });
  },
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: "get",
    });
  },
  getScheduleDetail(hoscode, depcode, workDate) {
    return request({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
      method: "get",
    });
  },
};
