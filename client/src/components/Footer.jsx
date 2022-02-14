import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import '../App.css'

const gitHub = () => {
  window.location.href='https://github.com/atruong0914/waifufy'
}

const linkedIn = () => {
  window.location.href='https://www.linkedin.com/in/annikatruong/'
}

const instaGram = () => {
  window.location.href='https://www.instagram.com/ign.xaster/'
}

const twitchTV = () => {
  window.location.href='https://www.twitch.tv/xasterttv'
}



export default function Footer() {
  return (
    <div className='footer'>
      <GitHubIcon onClick={() => {gitHub()}} className='icon-footer'/>
      <LinkedInIcon onClick={() => {linkedIn()}} className='icon-footer'/>
      <InstagramIcon onClick={() => {instaGram()}} className='icon-footer'/>
      <LiveTvIcon onClick={() => {twitchTV()}} className='icon-footer'/>
    </div>
  )
}
