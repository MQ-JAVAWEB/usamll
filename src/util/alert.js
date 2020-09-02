import Vue from "vue"
const vm = new Vue()


export const successAlert=(msg)=>{
  vm.$message({
    message: msg,
    type: 'success'
  });
}

export const warningAlert=(msg)=>{
  vm.$message({
    message: msg,
    type: 'warning'
  });
}