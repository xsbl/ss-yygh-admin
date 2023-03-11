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
};
