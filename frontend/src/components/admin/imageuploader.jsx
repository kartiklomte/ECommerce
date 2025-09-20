import { Label } from '@radix-ui/react-label'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const Imageuploader = ({imagefile,setImageFile,imageUrl,setImageUrl,setImageLoadingState,imageLoadingState,isEditMode}) => {
    const inputRef = useRef(null);

    // for selecting the first file
    function handleImageFileChange(event){
        const selectedFiles = event.target.files?.[0];
        if(selectedFiles) setImageFile(selectedFiles);
    }

    //for stoping the default dragover function to exicute
    function handleDragOver(event){
        event.preventDefault();
    }

    //for taking file which is droped on the area
    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    //for the remove button or deselecting the image when cross is hit
    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    //async function for sending the image to the cloud and getting the url as response 
    async function uploadImageToCloud() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file',imagefile);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/admin/products/upload-img',
                data, 
                { withCredentials: true }
            );
            setImageUrl(response.data.result.url);
        } catch (error) {
            console.log(error);
        } finally{
            setImageLoadingState(false);
        }
        
    }

    //useEffet for uploading the image just as we drop it on the selectimage
    useEffect(()=>{
        if(imagefile !== null) uploadImageToCloud();
    },[imagefile]);
    
  return (
    <div className='w-full max-w-md mx-auto'>
        <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>

        <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}>
            {/* input box for image */}
            <Input type="file" id='imageUpload' className='hidden' ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}/>
            {
                // if-else function for waiting for the image or file to be selected this is will turn of while editing products details
                // if the image is not uploaded then show the cloud logo, if selected but waiting for the cloud to send the url then keep this in loading or if the image is uploaded and url is ready then exicute the logic 
                !imagefile ? 
                //first case
                <Label htmlFor='imageUpload' className={`${isEditMode ? "cursor-not-allowed" : "" }flex flex-col items-center justify-center h-32 cursor-pointer`}>
                    <UploadCloudIcon className='h-10 w-10 text-muted-foreground mb-2'/>
                    <span>drag and drop or click to upload image</span>
                </Label> 
                : 
                //second case
                imageLoadingState ? (
                    <Skeleton className='h-10 bg-gray-100'/>
                ) 
                :
                //third case
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <FileIcon className='w-8 h-8  text-primary'/>
                    </div>
                    <p className='text-sm font-medium'>{imagefile.name}</p>

                    {/* cross button for the cancelation of the image */}
                    <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                        <XIcon className='h-4 w-4'/>
                        <span className=' sr-only'>remove file</span>
                    </Button>
                </div>
            }
        </div>
    </div>
  )
}

export default Imageuploader