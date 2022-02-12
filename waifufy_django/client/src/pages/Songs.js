import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Song from '../components/Song'

export default function Songs() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>Songs</div>
  )
}
