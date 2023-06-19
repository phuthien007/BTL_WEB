import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const List15 = () => {
  return (
    <ul className="list-unstyled">
      <li className={style.item}>
        <Link to="/public/blogs/detail-blog/1" className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src="/resources/images/content/hands.png" alt="Hands" />
          </div>
          <div>
            <div className="text-blue">New York Times</div>
            <div className="font-weight-bold mb-2">Bitcoin Costs $10k+</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry&apos;s
              standard dummy text ...
            </div>
          </div>
        </Link>
      </li>
      <li className={style.item}>
        <Link to="/public/blogs/detail-blog/1" className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src="/resources/images/content/hands.png" alt="Hands" />
          </div>
          <div>
            <div className="text-blue">CNN</div>
            <div className="font-weight-bold mb-2">Bitcoin Costs $10k+</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry&apos;s
              standard dummy text ...
            </div>
          </div>
        </Link>
      </li>
      <li className={style.item}>
        <Link to="/public/blogs/detail-blog/1" className={style.itemLink}>
          <div className={`${style.itemCover} mr-3`}>
            <img src="/resources/images/content/hands.png" alt="Hands" />
          </div>
          <div>
            <div className="text-blue">English Speakers</div>
            <div className="font-weight-bold mb-2">Bitcoin Costs $10k+</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry&apos;s
              standard dummy text ...
            </div>
          </div>
        </Link>
      </li>
    </ul>
  )
}

export default List15
