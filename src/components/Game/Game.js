import React, { Component } from "react";
import FriendCard from "../FriendCard";
import Wrapper from "../Wrapper";
import Title from "../Title";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Score from "../Score";
import bats from "../../bats.json";

class Game extends Component {
  state = {
    bats,
    Score
  };

  componentDidMount() {
    this.setState({bats: this.shuffleBats(this.state.bats)});
  };

  handleCorrectGuess = newBatState => {
    const {topScore, score} = this.state;
    const newScore = score + 1;
    const newTopScore = newScore > topScore ? newScore : topScore;
    this.setState({
      bats: this.shuffleBats(newBatState),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = bats => {
    this.setState({
      bats: this.resetBats(bats),
      score: 0
    });
  };

  resetBats = bats => {
    const resetBats = bats.map(click => ({ ...click, clicked: false }));
    return this.shuffleBats(resetBats);
  };

  shuffleBats = bats => {
    let i = bats.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = bats[i];
      bats[i] = bats[j];
      bats[j] = temp;
      i--;
    }
    return bats;
  };

  handleClicks = id => {
    let correctGuess = false;
    const newBatState = this.state.bats.map(click => {
      const newClick = {...click};
      if (newClick.id === id) {
        if (!newClick.clicked) {
          newClick.clicked = true;
          correctGuess = true;
        }
      }
      return newBatState;
    });
    correctGuess
      ? this.handleCorrectGuess(newBatState)
      : this.handleIncorrectGuess(newBatState)
  };

  render() {
    return (
      <Wrapper>
        <Navbar>
          <Score score={this.state.score}  topScore={this.state.topScore}/>
        </Navbar>
          <Title>Collect all the bat friends! Click on a bat to collect it. But don't try to collect more than one or they will all fly away!</Title>
          {this.state.bats.map(bats => (
            <FriendCard
              id={bats.id}
              handleClicks={this.handleClicks}
              shake={!this.state.score && this.state.topScore}
              name={bats.name}
              image={bats.image}
            />
          ))}
          <Footer></Footer>
      </Wrapper>
    );
  };
};

export default Game;