//TODO: Research how accredited is this formula. (Mifflin-St Jeor)
export default function BMR1(weight: number, height: number, sex: number, age: number, change: number, activity: number): number {
    if(sex === 1){
        const calories = 10 * weight + 6.25 * height - 5 * age + 5;
        //MODIFICATION: Activity added to the formula
        return (calories * activity) * change;
    }
    const calories = 10 * weight + 6.25 * height - 5 * age - 161;
    //MODIFICATION: Activity added to the formula
    return (calories * activity) * change;
}