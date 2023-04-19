import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Colorthief from 'colorthief';

import styles from '../style.module.scss';

const Card = ({ list }) => {
  const [bgColor, setBgColor] = React.useState();
  const router = useRouter();

  const getColor = (id) => {
    const colorThief = new Colorthief();
    const imgId = document.getElementById(`img-${id}`);
    let color = colorThief.getColor(imgId);
    setBgColor(color.join(','));
  };

  return (
    <div
      className={styles.pokemon}
      style={{ backgroundColor: bgColor ? `rgb(${bgColor})` : 'black' }}
    >
      <h1>{list.id}</h1>
      <div className={styles.picture}>
        <Image
          id={`img-${list.id}`}
          src={list.sprites.other['official-artwork'].front_default}
          crossOrigin="anonymous"
          alt={list.species.name}
          onClick={() => router.push(`/pokedex/${list.id}`)}
          onLoad={() => getColor(list.id)}
          height={150}
          width={150}
        />
      </div>
      <div className={styles.desc}>
        <h3>{list.name}</h3>
      </div>
    </div>
  );
};

export default Card;
