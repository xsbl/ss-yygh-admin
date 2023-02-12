import request from "@/utils/request";

const prefix = "/api8202/admin/cmn/dict";
export default {
  //字典列表数据接口
  getDictList(id) {
    return request({
      url: `${prefix}/findChildData/${id}`,
      method: "get",
    });
  },
};
