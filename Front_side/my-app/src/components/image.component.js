import { ProfileImage , IconImage } from "../Styles/image.style";

export function ImageComponent({type , image_url}){
    if(type == 'profile')
        return <ProfileImage src={image_url?image_url:'/unknown_avatar.jpeg'} />
    if(type == 'icon') 
        return <IconImage src={image_url} />
}
