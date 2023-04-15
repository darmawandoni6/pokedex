import React from 'react';

import { useRouter } from 'next/router';

import httpService from '@helpers/httpService';
import cx from 'classnames';

import styles from './style.module.scss';

const Pokedex = () => {
  const [poke, setPoke] = React.useState();
  const { query } = useRouter();
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

  const description = () => {
    return [];
  };

  const getAbilities = () => {
    const data = poke.abilities.map((item) => item.ability.name);

    return data.join(' ');
  };
  const getForm = () => {
    const data = poke.forms.map((item) => item.name);
    return data.join(' ');
  };
  const getSection = () => [
    {
      label: 'ID',
      value: `#${poke.id}`,
    },
    {
      label: 'Height',
      value: `${poke.height / 10} m`,
    },
    {
      label: 'Weight',
      value: `${poke.weight / 10} kg`,
    },
    {
      label: 'Abilities',
      value: getAbilities(),
    },
    {
      label: 'Type',
      value: poke.types.map((item) => (
        <div className={cx(styles.box, styles[item.type.name])} key={item.slot}>
          {item.type.name}
        </div>
      )),
    },
    {
      label: 'Form',
      value: getForm(),
    },
  ];
  return (
    <div className={styles.main}>
      {poke && (
        <>
          <div className={styles.header}>
            <div className={styles.name}>{poke.name}</div>
          </div>
          <div className={styles.content}>
            <div className={styles.section1}>
              {getSection().map((item, i) => (
                <div className={styles.description} key={i}>
                  <div className={styles.label}>{item.label}</div>
                  <div className={styles.value}>{item.value}</div>
                </div>
              ))}
            </div>
            <div className={styles.section2}>
              <img src={poke.sprites.other['official-artwork'].front_default} alt="" />
              <div className={styles.desc}>
                {description().map((item, i) => (
                  <div className={styles.detail} key={i}>
                    {`${item.label} : ${item.value}`}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.section3}>
              <div className={styles.status}>
                {poke.stats.map((item, i) => (
                  <div className={styles.progress} key={i}>
                    <div className={styles.name}>{item.stat.name}</div>
                    <div className={cx(styles.maxValue, styles.value)}>
                      <div
                        className={styles.value}
                        style={{ width: (item.base_stat / 255) * 100 + '%' }}
                      >
                        {item.base_stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
