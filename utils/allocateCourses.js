// Function to allocate courses
function allocateCourses(lecturers, courses) {
  for (const course of courses) {
    const matchingLecturers = []; // Array to store lecturers with matching expertise

    for (const lecturer of lecturers) {
      const expertiseMatchScore = calculateExpertiseMatch(
        lecturer.expertise_areas,
        course.required_expertise
      );
      if (expertiseMatchScore > 0) {
        matchingLecturers.push({
          // Create a new object with specific details
          id: lecturer._id,
          title: lecturer.title, // Assuming you have a title field in the lecturer model
          name: lecturer.lastname,
          expertise_areas: lecturer.expertise_areas,
        });
      }
    }

    course.matchingLecturersDetails = matchingLecturers; // Assign the array of lecturer details
    if (course.matchingLecturersDetails.length === 0) {
      console.warn(`No suitable lecturer found for course: ${course.title}`);
    }
  }
  return courses; // Return allocated courses
}

// Function to calculate expertise match (Jaccard Similarity)
function calculateExpertiseMatch(expertise, requiredExpertise) {
  const intersection = expertise?.filter((keyword) =>
    requiredExpertise.some((req) => req.keyword === keyword)
  );
  const weightedIntersectionSum = intersection?.reduce((sum, keyword) => {
    const matchingExpertise = requiredExpertise?.find(
      (req) => req.keyword === keyword
    );
    return sum + matchingExpertise?.weight;
  }, 0);
  const union = new Set([
    ...expertise,
    ...requiredExpertise?.map((req) => req.keyword),
  ]);
  return weightedIntersectionSum / union.size;
}

module.exports = { allocateCourses };
