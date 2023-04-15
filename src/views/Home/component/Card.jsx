import React from 'react';

import { useRouter } from 'next/router';

import cx from 'classnames';

import styles from '../style.module.scss';

const Card = ({ list }) => {
  const router = useRouter();
  return (
    <div className={styles.pokemon}>
      <div className={styles.picture}>
        {/* <Image src={list.sprites.front_shiny} alt={list.species.name} /> */}
        <img
          src={list.sprites.other['official-artwork'].front_default}
          alt={list.species.name}
          onClick={() => router.push(`/pokedex/${list.id}`)}
        />
      </div>
      <div className={styles.desc}>
        <div className={styles.no}>{list.id}</div>
        <div className={styles.name}>{list.name}</div>
        <div className={styles.type}>
          {list.types.map((item) => (
            <div className={cx(styles.box, styles[item.type.name])} key={item.slot}>
              {item.type.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
