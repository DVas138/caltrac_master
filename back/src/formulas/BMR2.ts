//TODO: Research how accredited is this formula.
export default function BMR2(weight: number, height: number, sex: number, age: number, change: number, activity: number): number {
    if(sex === 1){
         const calories =  66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
        return (calories * activity) * change;
    }
    const calories = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    return (calories * activity) * change;
}