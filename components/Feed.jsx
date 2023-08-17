'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchTextChange = (e) => {

  }

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt', {
        headers: {
          'Cache-Control': 'no-cache', // Set cache-control header to prevent caching
        },
      });
      const data = await response.json()

      setPosts(data);
    }

    fetchPrompts()
  }, [])

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed