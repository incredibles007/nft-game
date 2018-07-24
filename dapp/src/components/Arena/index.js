import React from 'react';
import classnames from 'classnames/bind';
import style from './Arena.css';
import { TweenMax, } from "gsap/TweenMax";
import BattleCard from '../BattleCard';
import Loading from '../Loading';
import gameplaytitleImg from '../../images/gameplaytitle.png';
import playgameImg from '../../images/playgame.png';
import historyImg from '../../images/history.png';
import bigImg from '../../images/big.png';
import winImg from '../../images/winlogo.png';
import lostImg from '../../images/youlost.png';

const cx = classnames.bind(style);

export default class extends React.Component {
  state = {
    cards: [
      '1213321',
      '1213322',
      '1213323',
      '1213324',
    ],
    selectedCard: '1213322',
    betEth: 0.01,
    isLoading: false,
    isShowResult: false,
    isShowHistory: false,
    hasBattleResult: false,
    battleResult: {},
  }

  // 賭金輸入
  handleBetETHChange = e => {
    let betEth = e.target.value;
    if(betEth > 1) {
      alert('bet eth should not bigger than 1');
      betEth = 0.01;
    }

    this.setState({
      betEth,
    });
  }

  // 卡片選擇
  handleSelectChange = e => {
    this.setState({
      selectedCard: e.target.value,
    });
  }

  // 開始賭
  handlePlaceBet = e => {
    const { betEth, selectedCard, } = this.state;
    if(betEth > 1 || betEth < 0.01) {
      alert('bet eth should not be bigger than 1 and less than 0.01');
      return;
    }

    this.setState({
      isLoading: true,
    });

    window.setTimeout(() => {
      this.setState({
        isLoading: false,
        isShowResult: true,
        isShowHistory: false,
        hasBattleResult: true,
        battleResult: {
          isWin: true,
        },
      });
    }, 0);
  }

  // 看歷史戰鬥
  handleShowHistory = e => {
    this.setState({
      isLoading: true,
    });

    window.setTimeout(() => {
      this.setState({
        isLoading: false,
        isShowResult: false,
        isShowHistory: true,
      });
    }, 3000);
  }

  // 回到鬥技場
  handleBackArena = e => {
    this.setState({
      isLoading: false,
      isShowHistory: false,
      isShowResult: false,
      hasBattleResult: false,
      battleResult: {},
    });
  }

  render() {
    const { cards, selectedCard, betEth, isShowResult, isShowHistory, isLoading, hasBattleResult, battleResult, } = this.state;
    const { isShowArena, handleBack, } = this.props;
    
    return (
      <div className={cx('arena', { open: isShowArena })}>
        <div className="cloud_card1"></div>
        <div className="cloud_card2"></div>
        <div className="ui bg_footer"></div>

        <div className="card-title">
          <img src={ gameplaytitleImg } />
        </div>

        {
          isLoading &&
          <div className={cx('loading-spinner')}>
            <div style={{display: 'inline-block', width: '100px'}}><Loading /></div>
          </div>
        }

        { /* 開局 */}
        {
          !isLoading && !isShowHistory && !isShowResult &&
          <div >
            <a className="go-back-link-in-arena" onClick={handleBack}></a>
            <div className={cx('battle-field')}>
              <div className={cx('left')}>
                <div className={cx('left-item')}>
                  <label className={cx('select_card_field')} for="select-card">
                    <select id="select-card" value={selectedCard} onChange={this.handleSelectChange}>
                    {
                      cards.map(card => (<option value={card}>{card}</option>))
                    }
                    </select>
                  </label>
                </div>

                <div className={cx('left-item')}>
                  <span className={cx('bet_eth_field')}>
                    <input type="number" name="betEth" value={betEth} onChange={this.handleBetETHChange} />
                  </span>
                  <a onClick={this.handlePlaceBet}>
                    <img className={cx('place_bet_button')} src={playgameImg} />
                  </a>
                </div>
              
              </div>

              <div className={cx('center')}>
                <BattleCard 
                  isLock
                  isOpenCard={true}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
                />
              </div>

              <div className={cx('right')}>
                <div className={cx('right-item')}>
                  <a onClick={this.handleShowHistory}>
                    <img className={cx('history-button')} src={historyImg} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        }

        { /* 戰鬥結果 */ }
        {
          isShowResult && 
          <div>
            <a className="go-back-link-in-arena" onClick={this.handleBackArena}></a>
            <div className={cx('battle-result')}>
              <div className={cx('left')}>
                <BattleCard 
                  isSmall
                  isLock
                  isOpenCard={true}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
                  />
              </div>
              <div className={cx('center')}>
                <div className={cx('result-center-container', { isSmall: false})}>
                  <img src={bigImg} />
                </div>
              </div>
              <div className={cx('right')}>
                <BattleCard 
                  isSmall
                  isOpenCard={false}
                  bgImg="QmTDfdUwLNTXJ1PgRqPxyW41jrdxhvh72C4h62dNhNgvtP"
                  pixelImg="QmVALBXYymSKPz5wN1JFVHrZmnNhz7JW8J8QM5zVrHmagk"
                  numberImg="Qmd9Xyuf3zQiyPfjDisVwL6J4AcTJy4ycFWBXdCQmjupyk"
                  />
              </div>
            </div>

            {
              hasBattleResult && battleResult.isWin && 
              <div className={cx('battle-result-win')}>
                <div className="start1"></div>
                <div className="start2"></div>
                <div className="start3"></div>
                <div className="start4"></div>
                <div className="start5"></div>
                <div className="start6"></div>
                <img className={cx('win')} src={winImg} />
              </div>
            }

            {
              hasBattleResult && !battleResult.isWin && 
              <div className={cx('battle-result-lose')}>
                <div className="ghost1"></div>
                <div className="ghost2"></div>
                <img className={cx('lost')} src={lostImg} />
              </div>
            }

          </div>
        }

        { /* 歷史訊息 */}
        {
          isShowHistory && 
          <div className={cx('battle-history')}>
            <a className="go-back-link-in-arena" onClick={this.handleBackArena}></a>

            history
          </div>
        }
      </div>
    )

  }
}
