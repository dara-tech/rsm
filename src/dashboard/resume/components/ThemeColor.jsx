import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import * as GlobalApi from "@/service/GlobalApi"; 
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors = [
        "#FF6F61", // Coral
        "#6B5B95", // Purple
        "#88B04B", // Green
        "#F7CAC9", // Pink
        "#92A8D1", // Blue
        "#955251", // Mauve
        "#B565A7", // Orchid
        "#009B77", // Teal
        "#DD4124", // Red
        "#D65076", // Magenta
        "#45B8AC", // Aqua
        "#EFC050", // Gold
        "#5B5EA6", // Indigo
        "#9B2335", // Crimson
        "#DFCFBE", // Sand
        "#BC243C", // Rose
        "#C3447A", // Fuchsia
        "#98B4D4", // Soft Blue
        "#E15D44", // Tangerine
        "#7FCDCD"  // Mint
    ];
    

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState();
    const {resumeid}=useParams();
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeid,data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated')
        })
    }

  return (
    <Popover>
  <PopoverTrigger asChild>
  <Button>
          <Palette className="p-1" /> 
        </Button>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-2'>
        {colors.map((item,index)=>(
            <div 
            onClick={()=>onColorSelect(item)}
            className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor==item&&'border border-black'}
             `}
            style={{
                background:item
            }}>

            </div>
        ))}
    </div>
  </PopoverContent>
</Popover>
  )
}

export default ThemeColor