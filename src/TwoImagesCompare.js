import React, { useState } from "react";
import axios from 'axios';

export default function TwoImagesCompare() {

    const [pic1, setPic1] = useState();
    const [file1, setFile1] = useState();
    const [pic1base64, setPic1base64] = useState();
    const [pic2, setPic2] = useState();
    const [file2, setFile2] = useState();
    const [pic2base64, setPic2base64] = useState();
    const [result, setResult] = useState();

    const onChangePic1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPic1(URL.createObjectURL(event.target.files[0]));
        }

        let files = event.target.files[0];
        setFile1(files);

        let reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = function () {

            let ans = reader.result;
            //data:image/jpeg;
            const myArray = ans.split("base64,");
            setPic1base64(myArray[1])
            console.log(myArray[1])
            
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onChangePic2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPic2(URL.createObjectURL(event.target.files[0]));
        }

        let files = event.target.files[0];
        setFile2(files);

        let reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = function () {

            let ans = reader.result;
            //data:image/jpeg;
            const myArray = ans.split("base64,");
            setPic2base64(myArray[1])
            console.log(myArray[1])
        };


        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
   
    const handleSubmission = () => {
        axios({
            method: 'post',
            url: "http://127.0.0.1:5000/picToBase64",
            headers: {},
            data: {
                pic1base64: pic1base64,
                pic1ID:"1",
                pic2base64: pic2base64,
                pic2ID:"2"
            }
        }).then((res) => {
            //please wait for the windows prompt for guidance 
            alert("File Upload success");
        })
            .catch((err) => alert("File Upload Error"));;
    }

    return (
        <div>

            <h2>Compare Pictures Here! </h2>
            <div style={{width:"50%",float:"left"}}>
                Image 1 Upload
                <div>
                    <input type="file" onChange={onChangePic1} ></input>
                </div>
                <img src={pic1} style={{ border:"5px solid red", width:"300px", height:"300px" }}/>

            </div>

            <div>
                Image 2 Upload
                <div>
                    <input type="file" onChange={onChangePic2}></input>
                </div>
                <img src={pic2} style={{ border:"5px solid pink", width:"300px", height:"300px" }}/>
            </div>

            <button onClick={handleSubmission}>Compare Two Images</button>

            <div>
                display results below
                {result}
            </div>
        </div>
    )
}