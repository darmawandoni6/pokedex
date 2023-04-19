import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import httpService from '@helpers/httpService';
import cx from 'classnames';
import Colorthief from 'colorthief';

import styles from './style.module.scss';

const Pokedex = () => {
  const [poke, setPoke] = React.useState();
  const [bgColor, setBgColor] = React.useState();
  const { query, push } = useRouter();

  React.useEffect(() => {
    const { id } = query;
    if (id) {
      getAPi(id);
    }
  }, [query]);

  const getAPi = async (index) => {
    const { data } = await httpService.get(`/pokemon/${index}`);
    setPoke(data);
  };

  const getValue = (name) => {
    const find = poke.stats.find((item) => item.stat.name === name);
    if (find) return find.base_stat;
    return 0;
  };
  const handleStatus = () => {
    const res = [
      {
        label: 'HP',
        value: getValue('hp'),
        base: 300,
        bg: '#d63949',
      },
      {
        label: 'ATK',
        value: getValue('attack'),
        base: 300,
        bg: '#fba824',
      },
      {
        label: 'DEF',
        value: getValue('defense'),
        base: 300,
        bg: '#0091ef',
      },
      {
        label: 'SPD',
        value: getValue('speed'),
        base: 300,
        bg: '#90b0c6',
      },
      {
        label: 'EXP',
        value: poke.base_experience,
        base: 1000,
        bg: '#8eb1c5',
      },
    ];
    return res;
  };

  const getColor = (id) => {
    const colorThief = new Colorthief();
    const imgId = document.getElementById(`img-${id}`);
    let color = colorThief.getColor(imgId);
    setBgColor(color.join(','));
  };

  if (!poke) return;
  return (
    <div className={styles.main}>
      <div
        className={styles.picture}
        style={{ backgroundColor: bgColor ? `rgb(${bgColor})` : 'black' }}
      >
        {/* <div className={styles.header}>
          <div className={styles.back}>
            <button>
              <i className="fas fa-arrow-left"></i>
            </button>
            <p>Pokedex</p>
          </div>
          <h1>{poke.id}</h1>
        </div> */}

        <Image
          id={`img-${poke.id}`}
          src={poke.sprites.other['official-artwork'].front_default}
          crossOrigin="anonymous"
          alt={poke.species.name}
          onLoad={() => getColor(poke.id)}
          height={150}
          width={150}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{poke.name}</h1>
        </div>
        <div className={styles.type}>
          {poke.types.map((item) => (
            <div className={cx(styles.box, styles[item.type.name])} key={item.slot}>
              {item.type.name}
            </div>
          ))}
        </div>
        <div className={styles.profile}>
          <section>
            <h2>{`${poke.weight / 10} KG`}</h2>
            <h4>Weight</h4>
          </section>
          <section>
            <h2>{`${poke.height / 10} M`}</h2>
            <h4>Height</h4>
          </section>
        </div>
        <div className={styles.baseStats}>
          <h1>Base Stats</h1>
          <div className={styles.status}>
            {handleStatus(poke.stats).map((item, i) => (
              <div className={styles.progress} key={i}>
                <div className={styles.name}>{item.label}</div>
                <div className={cx(styles.maxValue, styles.value)}>
                  <div
                    className={styles.value}
                    style={{
                      width: (item.value / item.base) * 100 + '%',
                      backgroundColor: item.bg,
                    }}
                  >
                    <section>{`${item.value} / ${item.base}`}</section>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer>
          {parseInt(query.id) > 1 && (
            <button onClick={() => push(`/pokedex/${parseInt(query.id) - 1}`)}>
              <i className="fas fa-arrow-left"></i> Prev
            </button>
          )}
          <button onClick={() => push('/')}>
            <i className="fas fa-list"></i> List
          </button>
          <button onClick={() => push(`/pokedex/${parseInt(query.id) + 1}`)}>
            Next <i className="fas fa-arrow-right"></i>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Pokedex;
