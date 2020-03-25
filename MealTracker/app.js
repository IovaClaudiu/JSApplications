// Storage Controller
const StorageCtrl = (function () {
    // Public methods
    return {
        storeItem: function (item) {
            let items;
            // Check if any items in local storage
            if (localStorage.getItem("items") === null) {
                items = [];
                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem("items"));
                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
            }
        },

        getItemsFromStorage: function () {
            let items;
            if (localStorage.getItem("items") === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;
        },

        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });

            localStorage.setItem("items", JSON.stringify(items));
        },

        deleteItemFromStorage: function (id) {
            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach((item, index) => {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });

            localStorage.setItem("items", JSON.stringify(items));
        },

        clearItemsFromStorage: function () {
            localStorage.removeItem("items");
        }
    };
})();

// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    // Data Structor / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function () {
            return data.items;
        },

        logData: function () {
            return data;
        },

        addItem: function (name, calories) {
            // Create id
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);
            return newItem;
        },

        getTotalCalories: function () {
            let total = 0;

            data.items.forEach(item => (total += item.calories));

            // Set total calories in data structure
            data.totalCalories = total;

            // Return total calories
            return data.totalCalories;
        },

        getItemById: function (id) {
            let found = null;
            // Lood through items
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        getCurrentItem: function () {
            return data.currentItem;
        },

        updatedItem: function (name, calories) {
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },

        deleteItem: function (id) {
            const ids = data.items.map(item => item.id);

            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },

        clearAllItems: function () {
            data.items = [];
        }
    };
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        itemNameInput: "#item-name",
        itemNameCalories: "#item-calories",
        totalCalories: ".total-calories",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        listItems: "#item-list li",
        clearAllBtn: ".clear-btn"
    };

    // Public methods
    return {
        populateItemList: function (items) {
            let html = "";
            items.forEach(item => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getSelectors: function () {
            return UISelectors;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemNameCalories).value
            };
        },

        addListItem: function (item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = "block";
            // Create li element
            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;

            // Insert item
            document
                .querySelector(UISelectors.itemList)
                .insertAdjacentElement("beforeend", li);
        },

        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemNameCalories).value = "";
        },

        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = "none";
        },

        showTotalCalories: function (calories) {
            document.querySelector(UISelectors.totalCalories).textContent = calories;
        },

        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },

        addItemToForm: function () {
            document.querySelector(
                UISelectors.itemNameInput
            ).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(
                UISelectors.itemNameCalories
            ).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },

        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },

        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Convert node list into array, because it cames as a NodeList and we can't use for-each
            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute("id");
                if (itemID === `item-${item.id}`) {
                    document.querySelector(
                        `#${itemID}`
                    ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },

        deleteListItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        removeItems: function () {
            let listItems = document.querySelector(UISelectors.listItems);

            // Turn NodeList into an Array
            listItems = Array.from(listItems);

            listItems.forEach(item => item.remove());
        }
    };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        const UISelectors = UICtrl.getSelectors();

        // Disable submit on enter
        document.addEventListener("keypress", e => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Add item event
        document
            .querySelector(UISelectors.addBtn)
            .addEventListener("click", itemAddSubmit);

        // Edit icon click even
        document
            .querySelector(UISelectors.itemList)
            .addEventListener("click", itemEditClick);

        // Update item event
        document
            .querySelector(UISelectors.updateBtn)
            .addEventListener("click", itemUpdateSubmit);

        // Back button event
        document
            .querySelector(UISelectors.backBtn)
            .addEventListener("click", UICtrl.clearEditState);

        // Delete item event
        document
            .querySelector(UISelectors.deleteBtn)
            .addEventListener("click", itemDeleteSubmit);

        // Clear all event
        document
            .querySelector(UISelectors.clearAllBtn)
            .addEventListener("click", clearAllItemClick);
    };

    // Add item submit
    const itemAddSubmit = function (e) {
        e.preventDefault();

        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== "" && input.calories !== "") {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in local storage
            StorageCtrl.storeItem(newItem);

            // Clear fields
            UICtrl.clearInput();
        } else {
            alert("Please add all the required information");
        }
    };

    const itemEditClick = function (e) {
        if (e.target.classList.contains("edit-item")) {
            // Get list item id (item-0, item-1)
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArray = listId.split("-");

            // Get the actual id
            const id = parseInt(listIdArray[1]);

            // Get item after id
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    const itemUpdateSubmit = function (e) {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    };

    const itemDeleteSubmit = function (e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    };

    const clearAllItemClick = function () {
        // Delete all items from data strucutre
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Clear from local storage
        StorageCtrl.clearItemsFromStorage();

        UICtrl.hideList();

        // Remove from UI
        UICtrl.removeItems();
    };

    // Public methods
    return {
        init: function () {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if (items.length === 0) {
                UICtrl.hideList();
            }
            // Populate list with items
            UICtrl.populateItemList(items);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear edit state
            UICtrl.clearEditState();

            // Load event listeners
            loadEventListeners();
        }
    };
})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();