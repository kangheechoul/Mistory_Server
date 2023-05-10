
// 서브 기능 목록
class Lib {

    constructor(){

    }

    //mysql where 문 생성
    create_where = (where)=>{
        let where_info = {
            "bind" : [],
            "where" : "",
        }
       
        Object.entries(where).forEach(([key, value])=>{

            let temp_key = key.split(" ");

            // 조건이 = 이 아닐때
            if(temp_key[1]){
                where_info.where += ` and ${temp_key[0]} ${temp_key[1]} `;
                if(typeof(value) == "object"){
                
                    if(temp_key[1] == "between"){
                        where_info.where += `? and ?`;
                        where_info.bind.push(value[0],value[1]);
                    }else{
                        let list_value = value.map((a)=>{
                            let str = "";
                            str += `?`;
                            where_info.bind.push(a);
                            return str;
                        });
                        where_info.where += `(${list_value})`;
                    }
                }else{
                    where_info.where += `?`;
                    where_info.bind.push(value);
                }
            }else{
                where_info.where += ` and ${temp_key[0]} = ?`;
                where_info.bind.push(value);
            }
        });

        return where_info;
    }
    
    create_limit = (limit) =>{
        return [((limit[0]-1 < 0 ? 0 : limit[0]-1) * limit[1]), limit[1]]
    }


}

module.exports = Lib;