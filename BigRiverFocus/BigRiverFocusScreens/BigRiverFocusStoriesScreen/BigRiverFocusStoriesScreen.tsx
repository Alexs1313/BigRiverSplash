import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BigRiverFocusBrownButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusBrownButton';
import {BigRiverFocusFocusTabBar} from '../../BigRiverFocusComponents/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusFocusTabBar';
import {
  BigRiverFocusBackIcon,
  BigRiverFocusHomeIcon,
  BigRiverFocusIconButton,
  BigRiverFocusShareIcon,
  BigRiverFocusTopIconButton,
} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusIcons/BigRiverFocusIconButton';
import {BigRiverFocusMessageBanner} from '../../BigRiverFocusComponents/BigRiverFocusCommon/BigRiverFocusBanners/BigRiverFocusMessageBanner';
import {BigRiverFocusStoryAnswerOption} from '../../BigRiverFocusComponents/BigRiverFocusStories/BigRiverFocusStoryQuiz/BigRiverFocusStoryAnswerOption';
import {BigRiverFocusStoryCard} from '../../BigRiverFocusComponents/BigRiverFocusStories/BigRiverFocusStoryFeed/BigRiverFocusStoryCard';
import {BigRiverFocusStoryResultBoard} from '../../BigRiverFocusComponents/BigRiverFocusStories/BigRiverFocusStoryResults/BigRiverFocusStoryResultBoard';
import {BigRiverFocusYellowButton} from '../../BigRiverFocusComponents/BigRiverFocusButtons/BigRiverFocusActions/BigRiverFocusYellowButton';
import {BIG_RIVER_FOCUS_STORIES, bigRiverFocusGetStarCount, bigRiverFocusGetStoryById} from '../../BigRiverFocusConstants/BigRiverFocusStories/BigRiverFocusStoriesData/BigRiverFocusStories';
import {BIG_RIVER_FOCUS_STORIES_MESSAGES} from '../../BigRiverFocusConstants/BigRiverFocusStories/BigRiverFocusStoriesMessages/BigRiverFocusStoriesMessages';
import {bigRiverFocusColors} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusColors';
import {bigRiverFocusFonts} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusTheme/BigRiverFocusFonts';
import {bigRiverFocusScale, bigRiverFocusVerticalScale} from '../../BigRiverFocusConstants/BigRiverFocusBase/BigRiverFocusLayout/BigRiverFocusLayout';
import type {BigRiverFocusHomeTab} from '../../BigRiverFocusConstants/BigRiverFocusNav/BigRiverFocusTabs/BigRiverFocusTabs';
import {bigRiverFocusFormatTime} from '../../../BigRiverFocusUtils/BigRiverFocusFormatting/BigRiverFocusTime/BigRiverFocusFormatTime';
import {bigRiverFocusAddFishBalance} from '../../../BigRiverFocusUtils/BigRiverFocusPersist/BigRiverFocusShop/BigRiverFocusShopPersist';
import {bigRiverFocusShareStory, bigRiverFocusShareStoryResult} from '../../../BigRiverFocusUtils/BigRiverFocusShare/BigRiverFocusStoryShare/BigRiverFocusShareStoryResult';

const BIG_RIVER_FOCUS_QUIZ_TIME_SECONDS = 15;

type BigRiverFocusStoryPath =
  | {screen: 'list'}
  | {screen: 'detail'; storyId: string}
  | {screen: 'quiz'; storyId: string}
  | {screen: 'result'; storyId: string; correctCount: number};

type BigRiverFocusQuizPhase = 'answering' | 'feedback';

type BigRiverFocusStoriesScreenProps = {
  onTabPress?: (tab: BigRiverFocusHomeTab) => void;
  onOpenHistory?: () => void;
  onOpenShop?: () => void;
};

export function BigRiverFocusStoriesScreen({
  onTabPress,
  onOpenHistory,
  onOpenShop,
}: BigRiverFocusStoriesScreenProps) {
  const insets = useSafeAreaInsets();
  const [path, setPath] = useState<BigRiverFocusStoryPath>({screen: 'list'});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizPhase, setQuizPhase] = useState<BigRiverFocusQuizPhase>('answering');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(BIG_RIVER_FOCUS_QUIZ_TIME_SECONDS);

  const story =
    path.screen !== 'list' ? bigRiverFocusGetStoryById(path.storyId) : undefined;

  const currentQuestion = useMemo(() => {
    if (!story || path.screen !== 'quiz') {
      return null;
    }
    return story.questions[questionIndex] ?? null;
  }, [story, path, questionIndex]);

  const resetQuiz = useCallback(() => {
    setQuestionIndex(0);
    setQuizPhase('answering');
    setSelectedOptionId(null);
    setCorrectAnswers([]);
    setTimeLeft(BIG_RIVER_FOCUS_QUIZ_TIME_SECONDS);
  }, []);

  const startQuiz = useCallback(
    (storyId: string) => {
      resetQuiz();
      setPath({screen: 'quiz', storyId});
    },
    [resetQuiz],
  );

  useEffect(() => {
    if (path.screen !== 'quiz' || quizPhase !== 'answering') {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuizPhase(currentPhase => {
            if (currentPhase === 'answering') {
              setCorrectAnswers(current => [...current, false]);
              return 'feedback';
            }
            return currentPhase;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [path.screen, quizPhase, questionIndex]);

  const handleChooseAnswer = useCallback(() => {
    if (!currentQuestion || !selectedOptionId) {
      return;
    }

    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    setCorrectAnswers(prev => [...prev, isCorrect]);
    setQuizPhase('feedback');
  }, [currentQuestion, selectedOptionId]);

  const handleNextQuestion = useCallback(async () => {
    if (!story) {
      return;
    }

    const nextIndex = questionIndex + 1;
    if (nextIndex >= story.questions.length) {
      const totalCorrect = correctAnswers.filter(Boolean).length;
      await bigRiverFocusAddFishBalance(totalCorrect);
      setPath({
        screen: 'result',
        storyId: story.id,
        correctCount: totalCorrect,
      });
      return;
    }

    setQuestionIndex(nextIndex);
    setQuizPhase('answering');
    setSelectedOptionId(null);
    setTimeLeft(BIG_RIVER_FOCUS_QUIZ_TIME_SECONDS);
  }, [story, questionIndex, correctAnswers]);

  const headerMessage = useMemo(() => {
    if (path.screen === 'list') {
      return BIG_RIVER_FOCUS_STORIES_MESSAGES.listHeader;
    }
    if (path.screen === 'detail') {
      return BIG_RIVER_FOCUS_STORIES_MESSAGES.detailHeader;
    }
    if (path.screen === 'quiz') {
      return BIG_RIVER_FOCUS_STORIES_MESSAGES.quizHeader;
    }
    return BIG_RIVER_FOCUS_STORIES_MESSAGES.resultHeader;
  }, [path.screen]);

  const showThumbnail =
    path.screen === 'detail' ||
    path.screen === 'quiz' ||
    path.screen === 'result';

  const renderList = () => (
    <View style={styles.bigRiverFocusList}>
      {BIG_RIVER_FOCUS_STORIES.map(item => (
        <BigRiverFocusStoryCard
          key={item.id}
          story={item}
          onPressMore={() => setPath({screen: 'detail', storyId: item.id})}
        />
      ))}
    </View>
  );

  const renderDetail = () => {
    if (!story) {
      return null;
    }

    return (
      <View style={styles.bigRiverFocusDetailWrapper}>
        <View style={styles.bigRiverFocusDetailShadow}>
          <View style={styles.bigRiverFocusDetailCard}>
            <View style={styles.bigRiverFocusDetailContent}>
              <Text style={styles.bigRiverFocusDetailTitle}>{story.title}</Text>
              <Text style={styles.bigRiverFocusDetailBody}>{story.body}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bigRiverFocusDetailActions}>
          <BigRiverFocusIconButton
            onPress={() => setPath({screen: 'list'})}
            size={bigRiverFocusScale(74)}>
            <BigRiverFocusBackIcon />
          </BigRiverFocusIconButton>
          <BigRiverFocusBrownButton
            label="Start test"
            onPress={() => startQuiz(story.id)}
            width={bigRiverFocusScale(180)}
            height={bigRiverFocusVerticalScale(74)}
          />
          <BigRiverFocusIconButton onPress={() => bigRiverFocusShareStory(story)} size={bigRiverFocusScale(74)}>
            <Image source={require('../../BigRiverFocusAssets/BigRiverFocusShare.png')} />
          </BigRiverFocusIconButton>
        </View>
      </View>
    );
  };

  const renderQuiz = () => {
    if (!story || !currentQuestion) {
      return null;
    }

    const isFeedback = quizPhase === 'feedback';
    const lastAnswerCorrect = correctAnswers[correctAnswers.length - 1];
    const isLastQuestion = questionIndex === story.questions.length - 1;
    const timerText = bigRiverFocusFormatTime(timeLeft).slice(3);

    return (
      <View style={styles.bigRiverFocusQuizWrapper}>
        <View style={styles.bigRiverFocusQuestionShadow}>
          <View style={styles.bigRiverFocusQuestionCard}>
            <View style={styles.bigRiverFocusQuestionContent}>
              <View style={styles.bigRiverFocusQuestionHeader}>
                <View style={styles.bigRiverFocusBadge}>
                  <Text style={styles.bigRiverFocusBadgeText}>
                    Question {questionIndex + 1}/{story.questions.length}
                  </Text>
                </View>
                <View style={styles.bigRiverFocusTimerBadge}>
                  <Image
                    source={require('../../BigRiverFocusAssets/BigRiverFocusYelltimer.png')}
                    style={styles.bigRiverFocusTimerIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.bigRiverFocusBadgeText}>
                    {isFeedback ? '---' : timerText}
                  </Text>
                </View>
              </View>

              <Text style={styles.bigRiverFocusQuestionText}>
                {isFeedback
                  ? lastAnswerCorrect
                    ? BIG_RIVER_FOCUS_STORIES_MESSAGES.correct
                    : BIG_RIVER_FOCUS_STORIES_MESSAGES.incorrect
                  : currentQuestion.text}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bigRiverFocusOptions}>
          {currentQuestion.options.map(option => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.id === currentQuestion.correctOptionId;
            const highlighted = isFeedback && isCorrect;
            const showSelected = isFeedback ? isSelected : isSelected;

            return (
              <BigRiverFocusStoryAnswerOption
                key={option.id}
                text={option.text}
                selected={showSelected && !isFeedback}
                highlighted={highlighted}
                disabled={isFeedback}
                onPress={() => {
                  if (!isFeedback) {
                    setSelectedOptionId(option.id);
                  }
                }}
              />
            );
          })}
        </View>

        <View style={styles.bigRiverFocusQuizActions}>
          <BigRiverFocusIconButton
            onPress={() => setPath({screen: 'detail', storyId: story.id})}
            size={bigRiverFocusScale(74)}>
            <BigRiverFocusBackIcon />
          </BigRiverFocusIconButton>
          {isFeedback ? (
            <BigRiverFocusYellowButton
              label={isLastQuestion ? 'Result' : 'Next question'}
              onPress={handleNextQuestion}
              width={bigRiverFocusScale(250)}
            />
          ) : (
            <BigRiverFocusYellowButton
              label="Choose"
              onPress={handleChooseAnswer}
              width={bigRiverFocusScale(250)}
            />
          )}
        </View>
      </View>
    );
  };

  const renderResult = () => {
    if (!story || path.screen !== 'result') {
      return null;
    }

    const stars = bigRiverFocusGetStarCount(path.correctCount, story.questions.length);

    return (
      <View style={styles.bigRiverFocusResultWrapper}>
        <Image
          source={require('../../BigRiverFocusAssets/BigRiverFocusOboard3.png')}
          style={styles.bigRiverFocusResultCharacter}
          resizeMode="contain"
        />
        <BigRiverFocusStoryResultBoard stars={stars} fishCount={path.correctCount} />
        <View style={styles.bigRiverFocusResultActions}>
          <BigRiverFocusIconButton
            onPress={() => setPath({screen: 'list'})}
            size={bigRiverFocusScale(74)}>
            <BigRiverFocusBackIcon />
          </BigRiverFocusIconButton>
          <BigRiverFocusYellowButton
            label="Share"
            onPress={() =>
              bigRiverFocusShareStoryResult(
                story,
                path.correctCount,
                story.questions.length,
              )
            }
            width={bigRiverFocusScale(250)}
          />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../BigRiverFocusAssets/BigRiverFocusBg.png')}
      style={styles.bigRiverFocusBackground}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.bigRiverFocusScrollContent,
          {paddingTop: insets.top + bigRiverFocusVerticalScale(8)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bigRiverFocusTopRow}>
          {!showThumbnail && (
            <BigRiverFocusTopIconButton
              source={require('../../BigRiverFocusAssets/BigRiverFocusMaterial-symbols_history-rounded.png')}
              style={styles.bigRiverFocusTopLeftButton}
              onPress={onOpenHistory}
            />
          )}
          <View style={styles.bigRiverFocusTopMessage}>
            <BigRiverFocusMessageBanner
              message={headerMessage}
              showThumbnail={showThumbnail}
              avatarSource={require('../../BigRiverFocusAssets/BigRiverFocusStoriesheader.png')}
            />
          </View>
          {!showThumbnail && (
            <BigRiverFocusTopIconButton
              source={require('../../BigRiverFocusAssets/BigRiverFocusMingcute_shop-fill.png')}
              style={styles.bigRiverFocusTopRightButton}
              onPress={onOpenShop}
            />
          )}
        </View>

        {path.screen === 'list' && renderList()}
        {path.screen === 'detail' && renderDetail()}
        {path.screen === 'quiz' && renderQuiz()}
        {path.screen === 'result' && renderResult()}
      </ScrollView>

      {path.screen === 'list' && (
        <View
          style={[
            styles.bigRiverFocusFooter,
            {paddingBottom: insets.bottom + bigRiverFocusVerticalScale(12)},
          ]}>
          <BigRiverFocusFocusTabBar activeTab="stories" onTabPress={onTabPress} />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bigRiverFocusBackground: {
    flex: 1,
  },
  bigRiverFocusScrollContent: {
    flexGrow: 1,
    paddingBottom: bigRiverFocusVerticalScale(120),
    gap: bigRiverFocusVerticalScale(16),
  },
  bigRiverFocusTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: bigRiverFocusScale(12),
    gap: bigRiverFocusScale(10),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusTopLeftButton: {
    marginLeft: bigRiverFocusScale(12),
  },
  bigRiverFocusTopRightButton: {
    marginRight: bigRiverFocusScale(0),
    opacity: 0.7,
  },
  bigRiverFocusTopMessage: {
    flex: 1,
  },
  bigRiverFocusList: {
    gap: bigRiverFocusVerticalScale(14),
    paddingHorizontal: bigRiverFocusScale(24),
  },
  bigRiverFocusDetailWrapper: {
    gap: bigRiverFocusVerticalScale(20),
    paddingHorizontal: bigRiverFocusScale(24),
  },
  bigRiverFocusDetailShadow: {
    borderRadius: bigRiverFocusScale(20),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusDetailCard: {
    borderRadius: bigRiverFocusScale(20),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    backgroundColor: bigRiverFocusColors.panelYellow,
    overflow: 'hidden',
  },
  bigRiverFocusDetailContent: {
    paddingHorizontal: bigRiverFocusScale(20),
    paddingVertical: bigRiverFocusVerticalScale(18),
    gap: bigRiverFocusVerticalScale(12),
  },
  bigRiverFocusDetailTitle: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(24),
    textAlign: 'center',
  },
  bigRiverFocusDetailBody: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(14),
    lineHeight: bigRiverFocusScale(20),
    textAlign: 'center',
  },
  bigRiverFocusDetailActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(10),
  },
  bigRiverFocusQuizWrapper: {
    gap: bigRiverFocusVerticalScale(16),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusQuestionShadow: {
    borderRadius: bigRiverFocusScale(20),
    backgroundColor: bigRiverFocusColors.cardShadow,
    paddingBottom: bigRiverFocusVerticalScale(3),
  },
  bigRiverFocusQuestionCard: {
    borderRadius: bigRiverFocusScale(20),
    borderWidth: bigRiverFocusScale(1),
    borderColor: bigRiverFocusColors.buttonText,
    backgroundColor: bigRiverFocusColors.panelYellow,
  },
  bigRiverFocusQuestionContent: {
    paddingHorizontal: bigRiverFocusScale(16),
    paddingVertical: bigRiverFocusVerticalScale(16),
    gap: bigRiverFocusVerticalScale(16),
  },
  bigRiverFocusQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: bigRiverFocusScale(8),
  },
  bigRiverFocusBadge: {
    backgroundColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(10),
    paddingHorizontal: bigRiverFocusScale(10),
    paddingVertical: bigRiverFocusVerticalScale(6),
  },
  bigRiverFocusTimerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: bigRiverFocusScale(6),
    backgroundColor: bigRiverFocusColors.buttonText,
    borderRadius: bigRiverFocusScale(10),
    paddingHorizontal: bigRiverFocusScale(10),
    paddingVertical: bigRiverFocusVerticalScale(6),
  },
  bigRiverFocusBadgeText: {
    color: bigRiverFocusColors.panelYellow,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(13),
  },
  bigRiverFocusTimerIcon: {
    width: bigRiverFocusScale(16),
    height: bigRiverFocusScale(16),
  },
  bigRiverFocusQuestionText: {
    color: bigRiverFocusColors.buttonText,
    fontFamily: bigRiverFocusFonts.jotiOne,
    fontSize: bigRiverFocusScale(18),
    textAlign: 'center',
    lineHeight: bigRiverFocusScale(24),
    minHeight: bigRiverFocusVerticalScale(72),
  },
  bigRiverFocusOptions: {
    gap: bigRiverFocusVerticalScale(10),
  },
  bigRiverFocusQuizActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
    marginTop: bigRiverFocusVerticalScale(8),
  },
  bigRiverFocusResultWrapper: {
    alignItems: 'center',
    gap: bigRiverFocusVerticalScale(8),
    paddingHorizontal: bigRiverFocusScale(16),
  },
  bigRiverFocusResultCharacter: {
    width: bigRiverFocusScale(290),
    height: bigRiverFocusVerticalScale(290),
    marginTop: bigRiverFocusVerticalScale(-20),
    marginBottom: bigRiverFocusVerticalScale(-30),
    top: 60,
  },
  bigRiverFocusResultActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: bigRiverFocusScale(12),
    marginTop: bigRiverFocusVerticalScale(90),
  },
  bigRiverFocusFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
