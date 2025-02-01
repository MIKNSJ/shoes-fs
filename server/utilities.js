// These helper functions are used with Prisma ORM.



export function calcNumItems(arr) {
    var numItems = 0;

    for (var i=0; i<arr.length; i++) {
        numItems+=arr[i].quantity;
    }

    return numItems;
}


export function calcTotalPrice(arr) {
    var totalPrice = 0;

    for (var i=0; i<arr.length; i++) {
        totalPrice = totalPrice + (arr[i].quantity * arr[i].price);
    }

    return totalPrice;
}
