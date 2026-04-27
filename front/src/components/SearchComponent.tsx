import React from 'react'

function SearchComponent() {
  return (
    <div>
        <select>
            <option>선택</option>
        </select>
        <input type="text" placeholder='검색어를 입력하세요.' />
        <button>검색</button>
    </div>
  )
}

export default SearchComponent