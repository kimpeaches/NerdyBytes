function getStreak(dateList, user) {
  const filteredDates = dateList.filter((date) => {
    return date.user_id === user.id;
  });

  const uniqueDates = filteredDates.filter(
    (date, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          new Date(t.date).toDateString() ===
            new Date(date.date).toDateString() && t.user_id === date.user_id
      )
  );

  const decendingFilteredDates = uniqueDates.reverse();

  const findBreakIndex = (data) => {
    for (let i = 1; i < data.length; i++) {
      const current_date = new Date(data[i].date);
      const previous_date = new Date(data[i - 1].date);
      if (previous_date - current_date > 24 * 60 * 60 * 1000) {
        return i;
      }
    }
    return data.length;
  };

  const breakIndex = findBreakIndex(decendingFilteredDates);
  return decendingFilteredDates.slice(0, breakIndex).length;
}

export default getStreak;
