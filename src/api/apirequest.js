
var request = {
// 用户注册
  enrolment(data){
    const url = '/sso/enrolment.do';
    return this.$post(url, data);
  }
};

module.exports = request;
