// const check = () => {
//     let s = new Set();
//     let a = [1, 2, 3, 4];

// const { application } = require("express");

//     s.add(12);
//     s.add(3).add(4).add(5);
//     s.delete(5);
//     let out = s.delete(13);
//     let isthere = s.has(13);

//     for (let t of s) {
//         console.log(t);
//     }

//     let pp = [...s];
//     console.log(a);
//     console.log(s);

//     console.log(Math.max(...s));

//     s.forEach((num) => {
//         console.log(num * num);
//     })

//     let p = 1;
//     s.forEach((n) => { p = p * n; })
//     console.log(p);
// }

// const maps = () => {
//     let m = new Map([["one",2],["two",43]]);
//     console.log(m);

//     let o = {"one":1 , "five":4};

//     for(let k in o){
//         console.log(k);
//     }
    
//     for( let[k,v] of m)
//     {
//         console.log(k);
//     }
//     // let newM = new Map(Object.entries(o));

//     let newM = Object.entries(o);
//     console.log(newM[0]);
//     // console.log(newM);
// }

// maps();
// // check();


const callAPI = async()=>{
    const url = 'https://api.github.com/repos/Flanker-shyam/moviesAPI/commits';
    // let response =await fetch(url)
    // console.log(response.ok)
    // console.log(await response.json());

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => console.log(data[0]))
    //     .catch((err)=>{
    //         console.log("Error occured: ", err)
    //     })

    // fetch(url)
    //     .then(response => response.text())
    //     .then(data => console.log(data))
    //     .catch((err)=>{
    //         console.log("Error occured: ", err)
    //     })

    let response = await fetch(url)
    for(let[key,value] of response.headers){
        console.log(key, value)
    }
}

callAPI()

const postToApi = async() =>{
    const user = {
        name:"flanker",
        age : 23,
        course: 'MCA',
    }

    let url = 'http://localhost:3000/user';
    let response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json:charset=UTF-8',
            'Access-Control-Allow-Origin' : 'no-cors'

        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result.message);
}