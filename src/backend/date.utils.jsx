const compareDate = (date, dayToWait) => {
  const currentDate = new Date();
  const questionDate = new Date(date);
  const diffMilliSeconds = Math.abs(questionDate - currentDate);
  const diffInDays = diffMilliSeconds / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays) >= dayToWait;
};

export const getQuestionToReview = (box) => {
  const questionToReview = [];
  box.level.forEach((level) => {
    const questionsByLevel = level.questions.filter((question) => {
      return compareDate(question.date, level.id);
    });
    questionToReview.push({ level: level.id, toReview: questionsByLevel });
  });
  return questionToReview;
};

export const howManyToReview = (box) => {
  let count = 0;
  const questionToReview = getQuestionToReview(box);
  questionToReview.forEach((elem) => {
    count += elem.toReview.length;
  });
  return count;
};
