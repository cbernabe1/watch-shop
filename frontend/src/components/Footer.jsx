import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer(){
    return <footer className="bg-zinc-700 mt-80 flex flex-col items-center text-white space-y-6 py-5 drop-shadow-lg">
        <h1 className="text-3xl uppercase">Watchly</h1>
        <p className="text-sm font-thin">2024</p>
        <div>
            <ul className="flex space-x-4">
                <li className='text-blue-500 rounded-full bg-white p-1 cursor-pointer hover:scale-105'><FacebookIcon/></li>
                <li className='text-blue-300 rounded-full bg-white p-1 cursor-pointer hover:scale-105'><TwitterIcon/></li>
                <li className='text-red-400 rounded-full bg-white p-1 cursor-pointer hover:scale-105'><YouTubeIcon/></li>
                <li className='text-red-500 rounded-full bg-white p-1 cursor-pointer hover:scale-105'><InstagramIcon/></li>
                <li className='text-blue-500 rounded-full bg-white p-1 cursor-pointer hover:scale-105'><LinkedInIcon/></li>
            </ul>
        </div>
        <div className='border-2 p-2 rounded-md'>
            <ul className="flex space-x-4">
                <li>Our Services</li>
                <li>Our Projects</li>
                <li>Study</li>
                <li>+639123456789</li>
                <li>example@example.com</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
    </footer>
}

export default Footer;