const handleData = (updateTodo = false, updatePin = true)=>{
  let data = {
    id:1
  }
  if(updateTodo){
    data.todo = "This is test todo"
  }
  else if(updatePin){
    data.is_pinned = true
  }
  console.log(data)
}

handleData()