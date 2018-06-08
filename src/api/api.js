import axios from 'axios';

//let base = 'http://10.201.76.230:8080/rds/project/0c79cdcbaf9248ccaf94e073542ad6bf/command';
let base = process.env.URL;

//获取项目
export const getProject = params => { return axios.get(`${base}/selectAllCalProject`, { params: params}); };

//新增项目
export const addProject = params => { return axios.post(`${base}/insertCalProject`, params); };


//获取口径数据
export const getKnowledge = params => { return axios.post(`${base}/selectCalKLByNameAndProID`, params); };

//获取口径(分页)
export const getKnowledgePage = params => { return axios.post(`${base}/selectCalKLPage`, params); };

//根据标签获取口径数据
export const getKnowledgeByTag = params => { return axios.post(`${base}/selectCalKLByTagAndPid`, params); };

//根据标签获取口径数据(分页)
export const getKnowledgeByTagPage = params => { return axios.post(`${base}/selectCalKLByTagPage`, params); };

//新增口径数据
export const addKnowledge = params => { return axios.post(`${base}/insertCalKnowledge`, params); };

//删除口径
export const removeKnowledge = params => { return axios.get(`${base}/deleteCalKnowledgeById`, { params: params }); };

//获取要编辑的口径
export const getEditKnowledge = params => { return axios.post(`${base}/selectCalKLByIDAndPID`, params); };

//编辑口径
export const editKnowledge = params => { return axios.post(`${base}/updateCalKnowledgeByID`,  params); };


//获取标签
export const getTag = params => { return axios.get(`${base}/selectAllCalCateTagByPid`, { params: params }); };

//新增标签
export const addTag = params => { return axios.post(`${base}/insertCalCateTag`, params); };

//删除标签
export const removeTag = params => { return axios.post(`${base}/deleteCCTByTagAndPid`, params); };


//新增标签关系
export const addTagRela = params => { return axios.post(`${base}/insertCalTagRela`, params); };

//获取要编辑的标签
export const getEditTag = params => { return axios.get(`${base}/selectCalTRByCidAndPid`, { params: params}); };

//删除标签关系
export const removeTagRela = params => { return axios.post(`${base}/deleteCTRByTagAndPid`, params); };

//删除口径时删除标签关系
export const removeTRbyCid = params => { return axios.post(`${base}/deleteCTRByCidAndPid`, params); };

//编辑口径时删除标签关系
export const removeTRbyAll = params => { return axios.post(`${base}/deleteCalTagRela`, params); };


//export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
