import { AppBar } from "@mui/material";
import { IconImage } from "../Styles/image.style";
import '../Styles/pageLayout.css'
import { ImageComponent } from "./image.component";


export function PageLayoutComponent({children,navList}) {
    const navBarList=navList?navList:[
        {
            icon:'/sku_logo.png',
            text:""
        },
        {
            icon:"",
            text:"LogIn"
        },
        {
            icon:"",
            text:"Contact"
        },
    ]
    const navBar=navBarList.map(elem=>
    <li key={navBarList.indexOf(elem)} className='navBarList'>
        {elem.icon && <ImageComponent image_url={elem.icon} type='icon' />}
        <p style={{margin:"0"}} className='navBarText' >{elem.text} </p>
        </li>)
    return <div className="root-container">
        <AppBar style={{position:"relative"}} >
            <div className="appbar">
                <ul style={{
                    display:'flex',
                    alignItems:"center",
                    listStyleType:'none',
                    margin:'0',
                    padding:'0'
                }} >
                    {navBar}
                </ul>
            </div>
        </AppBar>
        <div className="container">
            {children}    
        </div>
    </div>
}
