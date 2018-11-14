class Adapter{
  constructor(urlAPI){
    this.url = urlAPI
  }
  getOne(id){
    return fetch(`${this.url}/${id}`)
    .then(resp=>resp.json())
  }
  getAll(){
    return fetch(this.url)
    .then(resp=>resp.json())
  }
  post(obj){
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp=>resp.json())
  }
}
