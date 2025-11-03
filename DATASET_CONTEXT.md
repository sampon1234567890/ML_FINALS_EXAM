# Dataset Context: Student Performance Data

## Overview

This document provides comprehensive information about the dataset used in the EduInsight Analytics system, its origins, characteristics, and global applicability.

## Dataset Source

**Name:** Student Performance Dataset  
**Source:** UCI Machine Learning Repository  
**Origin:** Two Portuguese secondary schools  
**Time Period:** 2005-2006 academic year  
**Total Records:** 395 students (Mathematics course)  
**Citation:** P. Cortez and A. Silva. Using Data Mining to Predict Secondary School Student Performance. In A. Brito and J. Teixeira Eds., Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008.

## Grading System

The dataset uses **Portugal's 0–20 grading scale**, which differs from common systems like 0-100 or GPA 0-4.0.

### Portuguese Grade Interpretation:
- **18-20:** Excellent (Very Good)
- **16-17:** Very Good
- **14-15:** Good
- **12-13:** Sufficient
- **10-11:** Sufficient (Minimum Pass)
- **0-9:** Insufficient (Fail)

### EduInsight Performance Categories:
We've simplified the Portuguese scale into three actionable categories:

| Category | Grade Range | Description | Action Required |
|----------|-------------|-------------|-----------------|
| **Good** | 15-20 | High Achiever | Continue current study habits, consider peer tutoring |
| **Average** | 10-14 | Moderate Performer | Focus on weak areas, increase study time |
| **At-Risk** | 0-9 | Needs Support | Immediate intervention, tutoring programs |

## Dataset Features

### 15 Core Features Used in Predictions:

#### 1. Demographic Information
- **age:** Student's age (15-22 years)
- **sex:** Student's gender (M/F)

#### 2. Family Background
- **Medu:** Mother's education (0=none, 1=primary, 2=5th-9th grade, 3=secondary, 4=higher)
- **Fedu:** Father's education (same scale as Medu)
- **famrel:** Quality of family relationships (1=very bad to 5=excellent)

#### 3. School-Related
- **traveltime:** Home to school travel time (1=<15min, 2=15-30min, 3=30min-1hr, 4=>1hr)
- **studytime:** Weekly study time (1=<2hrs, 2=2-5hrs, 3=5-10hrs, 4=>10hrs)
- **failures:** Number of past class failures (0-4)
- **absences:** Number of school absences (0-93)

#### 4. Lifestyle & Social
- **freetime:** Free time after school (1=very low to 5=very high)
- **goout:** Going out with friends (1=very low to 5=very high)
- **Dalc:** Workday alcohol consumption (1=very low to 5=very high)
- **Walc:** Weekend alcohol consumption (1=very low to 5=very high)
- **health:** Current health status (1=very bad to 5=very good)

#### 5. Academic Performance
- **G1:** First period grade (0-20)
- **G2:** Second period grade (0-20)
- **G3:** Final grade (0-20) - **Target Variable**

## Universal Applicability

### Why This Dataset Works Globally

Although developed in Portugal, the dataset's features represent **universal indicators** of student performance:

1. **Study Habits are Universal**
   - Time spent studying affects grades everywhere
   - Past failures indicate struggling students in any country
   - Absences correlate with poor performance globally

2. **Family Support is Cross-Cultural**
   - Parental education influences student success worldwide
   - Family relationships impact academic motivation universally
   - Socioeconomic factors (travel time, access to resources) are global

3. **Lifestyle Factors are Common**
   - Social activities vs. study balance affects all students
   - Health impacts learning capacity everywhere
   - Behavioral patterns (alcohol consumption, going out) show similar correlations across cultures

### Adapting to Different Educational Systems

The EduInsight Analytics framework can be adapted to any educational context:

#### Grade Scale Conversion Examples:

**Portuguese (0-20) → American (0-100):**
```
Portuguese  →  American
20          →  100
15          →  75 (Good threshold)
10          →  50 (Minimum pass)
0           →  0
```

**Portuguese (0-20) → GPA (0-4.0):**
```
Portuguese  →  GPA
18-20       →  4.0
15-17       →  3.0-3.9
12-14       →  2.0-2.9
10-11       →  1.0-1.9
0-9         →  0.0-0.9
```

**Portuguese (0-20) → UK System:**
```
Portuguese  →  UK Grade
18-20       →  A*/A
15-17       →  B
12-14       →  C
10-11       →  D
0-9         →  E/F
```

## Retraining with Local Data

The system can be retrained with local datasets from any country:

### Steps to Adapt:
1. **Collect Local Data:** Gather student records from your institution/country
2. **Map Features:** Ensure the same 15 features are present (or equivalents)
3. **Convert Grades:** Normalize target grades to your local scale
4. **Retrain Models:** Run the training scripts with your local dataset
5. **Update Categories:** Adjust "Good/Average/At-Risk" thresholds for your context

### Feature Equivalents in Other Systems:
- **Medu/Fedu** → Parent education level (universally recorded)
- **studytime** → Study hours per week (common metric)
- **failures** → Previous course failures/repeats (tracked globally)
- **absences** → School absences (universally documented)
- **G1/G2** → Mid-term grades, progress reports, or semester grades

## Statistical Summary

### Dataset Characteristics:
- **Total Students:** 395
- **Features:** 33 total (15 used for predictions)
- **Target Variable:** G3 (Final Grade)
- **Grade Distribution:**
  - Good (15-20): ~30%
  - Average (10-14): ~55%
  - At-Risk (0-9): ~15%

### Missing Data: None (Complete dataset)

### Balanced Classes: Reasonably balanced for classification tasks

## Model Performance on This Dataset

Our trained models achieve the following performance on Portuguese student data:

| Model | Metric | Score |
|-------|--------|-------|
| Linear Regression | R² Score | 0.78 |
| Linear Regression | RMSE | 2.12 |
| Naive Bayes | Accuracy | 82.3% |
| K-Nearest Neighbors | Accuracy | 89.9% |
| Support Vector Machine | Accuracy | 91.1% |
| Decision Tree | Accuracy | 87.3% |
| ANN (Regression) | R² Score | 0.83 |
| ANN (Classification) | Accuracy | 84.8% |

## Ethical Considerations

1. **Privacy:** All student data is anonymized (no names, IDs, or identifying information)
2. **Bias Awareness:** Dataset from two schools may not represent all student populations
3. **Cultural Context:** While features are universal, thresholds may need adjustment for local contexts
4. **Transparency:** We clearly document the Portuguese origin to prevent misinterpretation

## References

1. **Original Paper:**  
   Cortez, P., & Silva, A. M. G. (2008). Using data mining to predict secondary school student performance. In Proceedings of 5th Annual Future Business Technology Conference (pp. 5-12).

2. **UCI Repository:**  
   https://archive.ics.uci.edu/ml/datasets/Student+Performance

3. **Dataset Details:**  
   Attributes: 33 (demographic, social, school-related)  
   Instances: 649 (395 Math + 254 Portuguese language)

## Conclusion

The Student Performance Dataset, despite its Portuguese origin, provides a **globally applicable foundation** for educational analytics. The behavioral and academic patterns it reveals are consistent with student performance research worldwide. By understanding the dataset's context and properly adapting grade scales and thresholds, the EduInsight Analytics system can be effectively deployed in any educational environment.

The key to successful adaptation is recognizing that **student success factors are universal**, even when grading systems differ.
