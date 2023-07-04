import axiosUtil from '../utils/axiosUtils.js'

class Api{

    //食物种类food-API
    findallfood(){
        return axiosUtil.get('/food')
    }
    updatesort(data){
        return axiosUtil.post('/food/update',data)
    }
    

    //食物列表foodlist-API
    getonesort(name){
        return axiosUtil.get("/foodlist/getonesort",{
            params:{
                sort:name
            }
        })
    }
    createfoodlist(data){
        return axiosUtil.post('/foodlist',data)
    }
    getonefood(id){
        return axiosUtil.get("/foodlist/getone",{
            params:{
                id:id
            }
        })
    }
    updatefood(data){
        return axiosUtil.post('/foodlist/update',data)
    }

    //食物种类审核列表sortcheck-API
    createsortcheck(data){
        return axiosUtil.post('/sortcheck',data)
    }
    findonesortcheck(create_by){
        return axiosUtil.get("/sortcheck/getoneuser",{
            params:{
                create_by:create_by
            }
        })
    }
    findallsortcheck(){
        return axiosUtil.get('/sortcheck')
    }
    updatesortcheck(data){
        return axiosUtil.post('/sortcheck/update',data)
    }


    //食物审核列表foodcheck-API
    createfoodcheck(data){
        return axiosUtil.post('/foodcheck',data)
    }
    findonefoodcheck(create_by){
        return axiosUtil.get("/foodcheck/getoneuser",{
            params:{
                create_by:create_by
            }
        })
    }
    findallfoodcheck(){
        return axiosUtil.get('/foodcheck')
    }
    updatefoodcheck(data){
        return axiosUtil.post("/foodcheck/update",data)
    }


    //食物数据反馈
    createfoodfeed(data){
        return axiosUtil.post('/foodfeed',data)
    }
    findallfoodfeed(){
        return axiosUtil.get('/foodfeed')
    }


    //公告列表notice-API
    findallnotice(){
        return axiosUtil.get('/notice')
    }
    createnotice(data){
        return axiosUtil.post('/notice',data)
    }


    //反馈信息feedback-API
    findallfeed(){
        return axiosUtil.get('/feed')
    }
    createfeed(data){
        return axiosUtil.post('/feed',data)
    }
    uploadpic(data){
        return axiosUtil.post('/feed/uploadpic',data)

    }


    //用户列表user-API
    login(data){
        return axiosUtil.post("/user/login",data)
    }
    findalluser(){
        return axiosUtil.get('/user')
    }
    updateuser(data){
        return axiosUtil.post("/user/update",data)
    }
    getoneuser(name){
        return axiosUtil.get("/user/getone",{
            params:{
                name:name
            }
        })
    }
    createuser(data){
        return axiosUtil.post('/user',data)
    }
    deleteuser(data){
        return axiosUtil.post('/user/delete',data)
    }


    //角色申请-申请成为营养师rolecheck-API
    findallrolecheck(){
        return axiosUtil.get('/rolecheck')
    }
    updaterolecheck(data){
        return axiosUtil.post("/rolecheck/update",data)
    }
    createrolecheck(data){
        return axiosUtil.post('/rolecheck',data)
    }
    


    
    






    destroy(data){
        console.log(data)
        return axiosUtil.post("/tutorials/destroy",data)
    }


}

export default new Api();