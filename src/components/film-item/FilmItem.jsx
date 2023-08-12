import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToFavoriteFilms, removeFromFavoriteFilms, selectFavoriteFilms } from '../../redux/filmSlice'
import './film-item.scss'

const FilmItem = ({ film }) => {
  const favorites = useSelector(selectFavoriteFilms)


  const dispatch = useDispatch();
  const handleAddToFavorites = () => {
    if (!isFilmFav) {
      dispatch(addToFavoriteFilms(film));
    }
    else {
      dispatch(removeFromFavoriteFilms(film))
    }
  };

  const imageUrl = film?.poster_path !== null
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  const isFilmFav = favorites.some(e => e.id === film.id)

  return (
    <Card style={{ width: '18rem', position: 'relative' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className='d-flex flex-column justify-content-between'>
        <div>
          <Card.Title style={{ minHeight: '3rem' }}>{film.title}</Card.Title>
          <Card.Text style={{ minHeight: '3rem', maxHeight: '100px', overflow: 'hidden' }}>
            {film.overview ? film.overview : "There's nothing on the plot, serksi!"}
          </Card.Text>
        </div>
        <div className='d-flex justify-content-around'>
          <Link className='text-decoration-none' to={`/:${film.id}`}>
            <Button variant="primary">Film page</Button>
          </Link>
          <Button onClick={handleAddToFavorites} variant={isFilmFav ? 'warning' : 'success'}>
            Add to favorite<AiFillStar />
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}


export default FilmItem