import React from 'react';

import Image from 'next/image';

import httpService from '@helpers/httpService';

import test from '../../assets/image/pokemon-logo.png';
import Card from './component/Card';
import styles from './style.module.scss';

const index = () => {
  const [load, setLoad] = React.useState({
    page: 1,
    limit: 12,
  });
  const [list, setlist] = React.useState([]);

  React.useEffect(() => {
    getAPi(load);
  }, []);

  const getAPi = async ({ page, limit }) => {
    for (let index = page; index <= limit; index++) {
      const { data } = await httpService.get(`/pokemon/${index}`);
      setlist((prev) => [...prev, data]);
    }
  };

  const handleLoadmore = () => {
    const page = load.limit + 1;
    const limit = page + 12 - 1;
    setLoad({ page, limit });
    getAPi({ page, limit });
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Image src={test} alt="img" />
      </div>
      <div className={styles.list}>
        {list.map((item, i) => (
          <Card list={item} key={i} />
        ))}
      </div>
      <div className={styles.loadMore}>
        <button onClick={handleLoadmore}>Lihat lebih banyak Pokémon</button>
      </div>
    </div>
  );
};

export default index;
