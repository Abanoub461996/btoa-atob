import { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

import './App.css';
const fileTypes = ["JPG", "PNG", "GIF","pdf","docx"];
function dataURLtoFile(dataurl, filename) {
 
	let arr = dataurl.split(',')
	let	mime = arr[0].match(/:(.*?);/)[1]
	
	let	bstr = window.atob(arr[1])
	let	n = bstr.length
	let	u8arr = new Uint8Array(n)
		
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	
	return new File([u8arr], filename, {type:mime});
}
function getBase64(file) {
	let res:string | ArrayBuffer | null =''
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		localStorage.setItem('file',JSON.stringify({filename:file.name,file:reader.result}));
		// return new Promise((resolve, reject) => {
        //     reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file"));}
        //     reader.onload = function () {

        //         //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
		// 		if (typeof reader.result != 'string'&&reader.result != null){
		// 			let bytes = Array.from(new Uint8Array(reader.result));
					
		// 			//if you want the base64encoded file you would use the below line:
		// 			let base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));
					
		// 			//Resolve the promise with your custom file structure
		// 			resolve({ 
		// 				bytes,
		// 				base64StringFile,
		// 				fileName: file.name, 
		// 				fileType: file.type
		// 			});
		// 		}
        //     }
        //     reader.readAsArrayBuffer(file);
        // });

	};
	
 }
function App() {
	const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const onSelect = async(file)=>{
	console.log("before=>",file[0]);
	const base64 = getBase64(file[0])
	console.log(base64);
	
  }
  const getFile =async ()=>{
	const base64 = localStorage.getItem('file');
	if(base64){
		const local = JSON.parse(base64)
		const newFile = dataURLtoFile(local.file,local.filename);
		const blobUrl = URL.createObjectURL(newFile);
		setSrc(blobUrl)
		let blob = await fetch(blobUrl).then(r => r.blob());
		console.log("from url",blob);
		console.log('after=>',newFile);
	}
  }
  const [src,setSrc]=useState('')
  return (
	<>
	{src&&<img src={src} style={{width:'100px'}}/>}
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple onSelect={onSelect}/>
	<button onClick={getFile}>get File</button>
	</>
  );
}

export default App;
