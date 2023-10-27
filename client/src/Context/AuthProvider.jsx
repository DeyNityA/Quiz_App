import React,{ createContext, useReducer }  from 'react'

export const AuthContext=createContext({})
const reducer_add=(state,action)=>{
  switch(action.type){
      case 'add':
          return action.value
      case 'remove':
            return {}
      default: 
      return state
  }
}
const reducer_ans_save=(state,action)=>{
  switch(action.type){
      case 'save':
          const id=action.id;
          const ans=action.ans;
          return {...state,[id]:ans}
      case 'remove':
          return {}
      default: 
      return state
  }
}
const set_user=(state,action)=>{
  switch(action.type){
      case 'set':
         return action.value
      case 'remove':
          return null
      default: 
      return state
  }
}



function AuthProvider({children}) {
  const [Q_10s,dispatch]=useReducer(reducer_add,{})
  const [ans_store,Dispatch]=useReducer(reducer_ans_save,{})
  const [user,DISPATCH]=useReducer(set_user,null)

  return (
    <AuthContext.Provider value={{Q_10s,dispatch,ans_store,Dispatch,user,DISPATCH}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
