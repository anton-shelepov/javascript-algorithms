interface Courses {
    name: string;
    prices: PricesRange;
}

type PricesRange = [number | null, null | number];

function filterCoursesByPrice(courses: Courses[], pricesRange: PricesRange): Courses[] | [] {
    const [startFilterPrice, endFilterPrice] = transformPricesInValidForm(pricesRange);

    return courses.filter((coursesItem) => {
        const [startCoursesPrice, endCoursesPrice] = transformPricesInValidForm(coursesItem.prices);

        // Фильтрация по всему диапазону цен, исключая искомые значения
        // (Вариант 1 - менее строгая фильтрация)
        return startCoursesPrice < endFilterPrice && endCoursesPrice > startFilterPrice;

        // Фильтрация по начальной и конечной цене, включая искомые значения
        // (Вариант 2 - более строгая фильтрация)
        // return startCoursesPrice >= startFilterPrice && endCoursesPrice <= endFilterPrice;
    });
}

// Служит для проверки каждого из значений диапазона цен на тип number,
// в противном случае возвращает -Infinity или Infinity
function transformPricesInValidForm(prices: PricesRange) {
    return [prices[0] ?? -Infinity, prices[1] ?? Infinity];
}

// Выполняет сортировку курсов по минимальному значению диапазона цен,
// позволяет проводить сортировку по возрастанию (asc) и убыванию (desc)
function sortCoursesByPrice(courses: Courses[], sortType: "desc" | "asc"): Courses[] {
    return courses.sort((firstCourses, secondCourses) => {
        const firstCoursesPricesMin = firstCourses.prices[0] ?? 0;
        const secondCoursesPricesMin = secondCourses.prices[0] ?? 0;
        if (sortType === "asc") {
            return firstCoursesPricesMin - secondCoursesPricesMin;
        }
        return secondCoursesPricesMin - firstCoursesPricesMin;
    });
}

// Список курсов
let courses: Courses[] = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1: PricesRange = [null, 200];
let requiredRange2: PricesRange = [100, 350];
let requiredRange3: PricesRange = [200, null];

// Logs
console.log("Filter");
console.log(filterCoursesByPrice(courses, requiredRange1));
console.log(filterCoursesByPrice(courses, requiredRange2));
console.log(filterCoursesByPrice(courses, requiredRange3));

console.log("Sort by acs");
console.log(sortCoursesByPrice(filterCoursesByPrice(courses, requiredRange1), "asc"));
console.log(sortCoursesByPrice(filterCoursesByPrice(courses, requiredRange2), "asc"));

console.log("Sort by desc");
console.log(sortCoursesByPrice(filterCoursesByPrice(courses, requiredRange3), "desc"));
