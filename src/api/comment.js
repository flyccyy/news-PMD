import request from '@/utils/axiosreq.js'
// 对文章添加评论，加上文章id是添加评论的回复
function addComment({id,content,art_id}){
    return request({
        url:'v1_0/comments',
        method:'POST',
        data:{
            target:id,
            content,
            art_id:art_id || null
        }
    })
}

//获取评论
function getComment({type,source,offset,limit}){
    return request({
        url:'v1_0/comments',
        method:'GET',
        params:{
            type,
            source:source,
            offset:offset||null,
            limit:limit||null
        }
    })
}
export {addComment,getComment}