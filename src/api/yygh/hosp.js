import request from "@/utils/request";

const prefix = "/api8201/admin/hospital";
export default {
  //医院列表接口
  getHospList(pageNo, limit, searchObj) {
    return request({
      url: `${prefix}/list/${pageNo}/${limit}`,
      method: "get",
      params: searchObj,
    });
  },

  //修改医院状态
  updateHospStatus(id, status) {
    return request({
      url: `${prefix}/${id}/${status}`,
      method: "get",
    });
  },

  //查询医院详情
  getHospById(id) {
    return request({
      url: `${prefix}/detail/${id}`,
      method: "get",
    });
  },
};
