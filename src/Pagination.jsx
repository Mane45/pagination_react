import { useEffect, useState } from 'react'
import './App.css'
export const Pagination = ({ limit }) => {
    const [start, setStart] = useState(0)
    const [all, setAll] = useState([])
    const [show, setShow] = useState([])
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(res => {
                setAll(res)
                setShow(res.slice(0, limit))

            })
    }, [])

    useEffect(() => {
        setShow([...all].slice(start, start + limit))
    }, [start, activePage])

    const pagesCount = Math.ceil((all.length - 1) / limit)
    return <>
        <div className="pageWrapper">
            <div className="items">
                {
                    show.map(data => <div key={data.id}>
                        <img src={data.image} />
                        <p>{data.price} USD</p>
                    </div>)
                }
            </div>
            <div className="pagination">
                <button onClick={() => {
                    setStart(start - limit)
                    setActivePage(activePage - 1)
                }} disabled={start <= 0}>prev</button>
                {
                    Array.from({ length: pagesCount }).map((el, i) => <button onClick={() => {
                        setStart(start + limit)
                        setActivePage(i + 1)
                    }} key={i} className={activePage === i + 1 ? 'active' : ''}>{i + 1}</button>)

                }
                <button onClick={() => {
                    setStart(start + limit)
                    setActivePage(activePage + 1)
                }} disabled={start + limit >= all.length}>next</button>
            </div>

        </div>
    </>
}