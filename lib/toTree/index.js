function fn(data,pid){
    let result =[],temp;
    for(let i=0;i<data.length;i++){
        data[i].value=data[i].m_id;
        if(data[i].m_father == pid){
            result.push(data[i]);
            temp=fn(data,data[i].m_num);
            if(temp.length >0){
                data[i].data = temp;
            }
        }
    }
    return result;
}
module.exports = {toTree:fn};