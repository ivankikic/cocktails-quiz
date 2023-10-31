import db from '../../server/firebase'
import { collection, addDoc, query, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { useState } from 'react'
import { CocktailCard, Container } from './CocktailsStyles';
import { Oval } from 'react-loader-spinner'


type cocktailType = { id: string, name: any, ingredients: [], glass: [], method: [], ice: [], garnish:[] }

const Cocktails = () => {
    const [cocktails, setCocktails] = useState<cocktailType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    
      const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAllChecked(event.target.checked);
      };
    
      const filteredCocktails = cocktails.filter(cocktail => {
        if (isAllChecked) {
          return Object.values(cocktail).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          return cocktail.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });


    const handleFetchCocktails = async () => {
        data.map(async cocktail => {
            const dataName = cocktail.name;
            const dataIngredients = cocktail.ingredients;
            const dataGlass = [cocktail.glass];
            const dataMethod = [cocktail.method];
            const dataIce = [cocktail.ice];
            const dataGarnish = [cocktail.garnish];
            console.log('added')
            /*const formattedIngredients = ingredients.flatMap(ingredient => ingredient.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedGlass = glass.flatMap(glassItem => glassItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedMethod = method.flatMap(methodItem => methodItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedIce = ice.flatMap(iceItem => iceItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedGarnish = garnish.flatMap(garnishItem => garnishItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));*/
            const formattedDataName = dataName.trim().toLowerCase();
            const formattedDataIngredients = dataIngredients.flatMap(ingredient => ingredient.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedDataGlass = dataGlass.flatMap(glassItem => glassItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedDataMethod = dataMethod.flatMap(methodItem => methodItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedDataIce = dataIce.flatMap(iceItem => iceItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            const formattedDataGarnish = dataGarnish.flatMap(garnishItem => garnishItem.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase()));
            await addDoc(collection(db, "cocktails"), {
                name: formattedDataName,
                ingredients: formattedDataIngredients,
                glass: formattedDataGlass,
                method: formattedDataMethod,
                ice: formattedDataIce,
                garnish: formattedDataGarnish
            });
            setIsLoading(false);
        })


        const q = query(collection(db, "cocktails"));
        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            const cocktails: cocktailType[] = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data().name)
                cocktails.push({ id: doc.id, name: doc.data().name, ingredients: doc.data().ingredients, glass: doc.data().glass, method: doc.data().method, ice: doc.data().ice, garnish: doc.data().garnish });
            });
            setCocktails(cocktails);
        });
        return unSubscribe;
    }

    const resetAllData = async () => {
        setCocktails([]);
        setIsLoading(true);
        const q = query(collection(db, "cocktails"));
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        handleFetchCocktails();
    };

    


  return (
    <Container>
        <div>
            Number of cocktails: {cocktails.length}
            <button onClick={resetAllData}>Reset all data</button>
        </div>
        
        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <label>
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={handleCheckboxChange}
        />
        All
      </label>

      {/* ... other JSX elements */}

      {filteredCocktails.map(cocktail => (
        <CocktailCard>
          <h3><b>{cocktail.name}</b></h3>
                <p><b>Ingredients:</b> {cocktail.ingredients.join(', ')}</p>
                <p><b>Glass:</b> {cocktail.glass.join(', ')}</p>
                <p><b>Method:</b> {cocktail.method.join(', ')}</p>
                <p><b>Ice:</b> {cocktail.ice.join(', ')}</p>
                <p><b>Garnish:</b> {cocktail.garnish.join(', ')}</p>
        </CocktailCard>
      ))}


    {isLoading &&<Oval
    height={50}
    width={50}
    color="#333"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#333333"
    strokeWidth={1}
    strokeWidthSecondary={1}

    />}
    </Container>
  )
}

export default Cocktails


const data = [
    {
      "name": "Gin Tonic",
      "ingredients": ["30ml Gin", "100ml Tonic Water"],
      "glass": "Highball / GT",
      "method": "Build",
      "ice": "Cubed",
      "garnish": "Lime Wedge"
    },
    {
      "name": "Dry Martini",
      "ingredients": ["50ml Gin", "10ml Extra Dry Vermouth"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep strain",
      "ice": "NO",
      "garnish": "Lemon peel or green olive"
    },
    {
      "name": "Dirty Martini",
      "ingredients": ["50ml Gin", "10ml Extra Dry Vermouth", "20ml Olive Brine"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep strain",
      "ice": "NO",
      "garnish": "Green Olives"
    },
    {
      "name": "50/50 Martini",
      "ingredients": ["40ml Gin", "40ml Bianco Vermouth"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep strain",
      "ice": "NO",
      "garnish": "Lemon Peel"
    },
    {
      "name": "Negroni",
      "ingredients": ["20ml Gin", "20ml Sweet Vermouth", "20ml Campari"],
      "glass": "Tumbler",
      "method": "Stir, Julep strain",
      "ice": "Cubed or one clear ice block",
      "garnish": "Orange peel / orange slice"
    },
    {
      "name": "Bijou",
      "ingredients": ["20ml Gin", "20ml Sweet Vermouth", "20ml Green Chartreuse", "2dsh Orange Bitters"],
      "glass": "Tumbler",
      "method": "Stir, Julep strain",
      "ice": "Cubed or one clear ice block",
      "garnish": "Orange Peel"
    },
    {
      "name": "Martinez",
      "ingredients": ["40ml Gin", "40ml Sweet Vermouth", "1bsp Maraschino liqueur", "2dsh Orange Bitters"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep Strain",
      "ice": "NO",
      "garnish": "Lemon Peel"
    },
    {
      "name": "Gimlet",
      "ingredients": ["50ml Gin", "20ml Fresh Lime Juice", "15ml Simple Syrup"],
      "glass": "Chilled Coupe",
      "method": "Shake, Fine strain",
      "ice": "NO",
      "garnish": "Lime Peel"
    },
    {
      "name": "Southside",
      "ingredients": ["50ml Gin", "20ml Fresh Lime Juice", "15ml Simple Syrup", "5-8 Leaves of Fresh Mint"],
      "glass": "Chilled Coupe",
      "method": "Shake, Fine Strain",
      "ice": "NO",
      "garnish": "Fresh Mint leaf"
    },
    {
      "name": "Hanky Panky",
      "ingredients": ["40ml Gin", "40ml Sweet Vermouth", "1bsp Fernet Branca"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep Strain",
      "ice": "NO",
      "garnish": "Orange Peel"
    },
    {
      "name": "The Last Word",
      "ingredients": ["25ml Gin", "25ml Green Chartreuse", "25ml Maraschino", "25ml Fresh Lime juice"],
      "glass": "Chilled Coupe / Martini",
      "method": "Shake, Fine Strain",
      "ice": "NO",
      "garnish": "Lime Peel"
    },
    {
      "name": "Espresso Martini",
      "ingredients": ["50ml Vodka", "15ml Coffee Liqueur", "15ml Simple Syrup", "1 espresso shot (25-30ml)"],
      "glass": "Chilled Coupe",
      "method": "Shake (hard), Fine Strain",
      "ice": "NO",
      "garnish": "3 coffee beans"
    },
    {
      "name": "Moscow Mule",
      "ingredients": ["50ml Vodka", "20ml Fresh Lime juice", "Top-up (approximately 120ml) Ginger Beer"],
      "glass": "Mule Mug / Highball",
      "method": "Build",
      "ice": "Cubed",
      "garnish": "Lime Wedge / Mint sprig"
    },
    {
      "name": "Vesper Martini",
      "ingredients": ["50ml Gin", "20ml Vodka", "10ml Cocchi Americano Bianco (or Lillet Blanc)"],
      "glass": "Chilled Coupe / Martini",
      "method": "Stir, Julep strain",
      "ice": "NO",
      "garnish": "Lemon peel"
    },
    {
      "name": "Whiskey Smash",
      "ingredients": ["50ml Bourbon", "20ml Fresh Lemon Juice", "15ml Simple Syrup", "5-6 fresh Mint leaves"],
      "glass": "Tumbler",
      "method": "Shake, Fine strain",
      "ice": "Cubed",
      "garnish": "Fresh Mint sprig"
    },
    {
      "name": "Old Fashioned",
      "ingredients": ["50ml Bourbon", "10ml Simple Syrup", "3dsh Angostura Bitters"],
      "glass": "Tumbler",
      "method": "Stir, Julep strain",
      "ice": "Cubed or one clear ice block",
      "garnish": "Orange peel"
    },
    {
      "name": "Manhattan",
      "ingredients": ["50ml Rye Whiskey", "25ml Sweet Vermouth", "3dsh Angostura Bitters"],
      "glass": "Chilled Coupe",
      "method": "Stir, Julep strain",
      "ice": "NO",
      "garnish": "Cocktail cherry (amarena)"
    },
    {
      "name": "Boulevardier",
      "ingredients": ["30ml Bourbon", "20ml Sweet Vermouth", "20ml Campari"],
      "glass": "Tumbler",
      "method": "Stir, Julep strain",
      "ice": "Cubed or one clear ice block",
      "garnish": "Orange Peel / Orange slice"
    },
    {
      "name": "Tom Collins",
      "ingredients": ["50ml Gin", "20ml Fresh Lemon juice", "20ml Simple Syrup", "Top-up (approximately 60ml) Soda Water"],
      "glass": "Highball / Collins",
      "method": "Shake, Fine Strain, Top-up",
      "ice": "Cubed",
      "garnish": "Lemon Wedge"
    },
    {
      "name": "Bramble",
      "ingredients": ["40ml Gin", "20ml Fresh Lemon juice", "15ml Simple Syrup", "20ml Chambord (Float)"],
      "glass": "Tumbler",
      "method": "Shake, Strain, Float",
      "ice": "Crushed",
      "garnish": "Fresh Blackberries or Lemon peel"
    },
    {
      "name": "Corpse Reviver #2",
      "ingredients": ["25ml Gin", "25ml Bianco Vermouth", "20ml Fresh Lemon juice", "20ml Cointreau", "Rinse of Absinthe (or 4-5dsh or 3 spritzes with an atomizer)"],
      "glass": "Chilled and absinthe-rinsed Coupe",
      "method": "Shake, Fine strain",
      "ice": "NO",
      "garnish": "Lemon Peel"
    },
    {
      "name": "Southside (Fizz)",
      "ingredients": ["50ml Gin", "20ml Fresh Lime juice", "15ml Simple Syrup", "8-10 leaves of Fresh Mint", "Top up (approximately 50ml's) Soda Water"],
      "glass": "Highball / Collins",
      "method": "Build",
      "ice": "Cubed",
      "garnish": "Fresh Mint sprig"
    },
    {
      "name": "Bee's Knees",
      "ingredients": ["50ml Gin", "20ml Fresh Lemon juice", "15ml Honey Syrup"],
      "glass": "Chilled Coupe",
      "method": "Shake, Fine Strain",
      "ice": "NO",
      "garnish": "Lemon Peel"
    },
    {
      "name": "Vodka Tonic",
      "ingredients": ["30ml Vodka", "100ml Tonic Water"],
      "glass": "Highball",
      "method": "Build",
      "ice": "Cubed",
      "garnish": "Lime Wedge"
    },
    {
      "name": "Black Russian",
      "ingredients": ["50ml Vodka", "15ml Coffee Liqueur", "5ml Simple Syrup"],
      "glass": "Tumbler",
      "method": "Shake (hard), Fine strain",
      "ice": "Cubed",
      "garnish": "Coffee Beans"
    },
    {
      "name": "White Russian",
      "ingredients": ["50ml Vodka", "15ml Coffee Liqueur", "5ml Simple Syrup", "50ml Cream (or half&half)"],
      "glass": "Tumbler",
      "method": "Shake (hard), Fine strain / build",
      "ice": "Cubed",
      "garnish": "Coffee Beans"
    },
    {
      "name": "Cosmopolitan",
      "ingredients": ["40ml Citrus Vodka", "15ml Cointreau", "15ml Fresh Lime juice", "5ml Cranberry Juice"],
      "glass": "Chilled Coupe",
      "method": "Shake, Fine strain",
      "ice": "NO",
      "garnish": "Lime peel"
    },
    {
      "name": "French Martini",
      "ingredients": ["40ml Vodka", "15ml Chambord", "60ml Fresh Pineapple juice"],
      "glass": "Chilled Coupe",
      "method": "Shake, Fine strain",
      "ice": "NO",
      "garnish": "Pineapple Wedge"
    },
    {
      "name": "Greyhound",
      "ingredients": ["40ml Vodka", "80ml Fresh Pink Grapefruit juice", "10ml Simple Syrup"],
      "glass": "Highball (preferably a smaller one)",
      "method": "Shake, Fine strain",
      "ice": "Cubed",
      "garnish": "Pink Grapefruit wedge"
    },
    {
      "name": "Jack & Coke",
      "ingredients": ["30ml Jack Daniels", "100ml Coca-Cola"],
      "glass": "Highball / Tumbler",
      "method": "Build",
      "ice": "Cubed",
      "garnish": "Lemon Wedge / No Garnish"
    },
    {
      "name": "Whiskey Sour",
      "ingredients": ["50ml Bourbon", "20ml Fresh Lemon juice", "15ml Simple Syrup", "15ml (pasteurized) egg white"],
      "glass": "Tumbler",
      "method": "Dry Shake, Shake, Fine strain",
      "ice": "Cubed",
      "garnish": "Lemon / Orange Peel"
    },
    {
      "name": "John Collins",
      "ingredients": ["50ml Bourbon", "20ml Fresh Lemon juice", "20ml Simple Syrup", "Top-Up (approximately 60ml) Soda Water"],
      "glass": "Highball / Collins",
      "method": "Shake, Fine Strain, Top up",
      "ice": "Cubed",
      "garnish": "Lemon Wedge"
    },
    {
      "name": "Whiskey Flip",
      "ingredients": ["50ml Bourbon", "15ml Vanilla Liqueur", "1 Whole Egg", "(Optional 1-2dsh Chocolate Bitters)"],
      "glass": "Chilled Tumbler",
      "method": "Dry Shake, Shake, Fine strain",
      "ice": "NO or One clear ice block",
      "garnish": "Grated Nutmeg"
    },
    {
      "name": "Margarita",
      "ingredients": ["50ml Blanco Tequila", "20ml Cointreau", "20ml Fresh Lime juice", "5ml Agave Syrup (optional)"],
      "glass": "Chilled Coupe (half-rim salt)",
      "method": "Shake, Fine strain",
      "ice": "NO",
      "garnish": "Half-rim salt / Lime peel"
    },
    {
      "name": "Tommy's Margarita",
      "ingredients": ["50ml Blanco Tequila", "20ml Fresh Lime juice", "15ml Agave Nectar"],
      "glass": "Tumbler (half-rim salt)",
      "method": "Shake, Fine strain",
      "ice": "Cubed",
      "garnish": "Half salt rim / Lime Peel"
    },
    {
        "name": "Oaxaca Old Fashioned",
        "ingredients": [
          "30ml Aged Tequila (Anejo / Reposado)",
          "15ml Mezcal",
          "10ml Agave Syrup",
          "3dsh Angostura Bitter"
        ],
        "glass": "Tumbler",
        "method": "Stir, Julep strain",
        "ice": "One clear ice block",
        "garnish": "Orange Peel (optionally FLAMED)"
      },
      {
        "name": "Batanga",
        "ingredients": [
          "30ml Tequila",
          "15ml Fresh Lime juice",
          "100ml Coca-Cola"
        ],
        "glass": "Highball (salt-rimmed)",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Lime Wedge"
      },
      {
        "name": "Long Island Ice Tea",
        "ingredients": [
          "15ml Tequila",
          "15ml White Rum",
          "15ml Vodka",
          "15ml Gin",
          "15ml Cointreau",
          "15ml Simple Syrup",
          "15ml Fresh Lemon Juice",
          "Top-up (approximately 40ml) Coca-Cola"
        ],
        "glass": "Highball / Collins",
        "method": "Shake, Fine strain, Top up",
        "ice": "Cubed",
        "garnish": "Lemon Wheel"
      },
      {
        "name": "Tequila Tonic",
        "ingredients": [
          "30ml Tequila",
          "10ml Pink Grapefruit or Lime juice (optional)",
          "100ml Tonic Water"
        ],
        "glass": "Highball / White Wine (Riesling)",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Pink Grapefruit Slice"
      },
      {
        "name": "Rum Old Fashioned",
        "ingredients": [
          "50ml Aged Rum",
          "10ml Simple Syrup (for some sweeter style of rums even less)",
          "2dsh Choco Bitters",
          "2dsh Orange Bitters"
        ],
        "glass": "Tumbler",
        "method": "Stir, Julep strain",
        "ice": "One clear ice block OR Cubed",
        "garnish": "Orange Peel"
      },
      {
        "name": "Daiquiri",
        "ingredients": [
          "50ml White Rum (or a Light Aged Rum)",
          "20ml Fresh Lime juice",
          "15ml Simple Syrup"
        ],
        "glass": "Chilled Coupe",
        "method": "Shake, Fine strain",
        "ice": "NO",
        "garnish": "Lime peel"
      },
      {
        "name": "Cuba Libre",
        "ingredients": [
          "50ml Anejo (Aged) Rum",
          "15ml Fresh Lime juice",
          "100ml Coca-Cola"
        ],
        "glass": "Highball",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Lime Wedge"
      },
      {
        "name": "El Presidente",
        "ingredients": [
          "50ml Anejo (Aged) Rum",
          "25ml Sweet Vermouth",
          "15ml Cointreau",
          "1bsp Grenadine Syrup"
        ],
        "glass": "Chilled Coupe",
        "method": "Stir, Julep strain",
        "ice": "NO",
        "garnish": "Orange peel"
      },
      {
        "name": "Santo Libre",
        "ingredients": [
          "50ml Anejo (Aged) Rum",
          "15ml Fresh Lime juice",
          "100ml Sprite"
        ],
        "glass": "Highball",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Lime wedge"
      },
      {
        "name": "Milano - Torino",
        "ingredients": ["30ml Sweet Vermouth", "30ml Campari"],
        "glass": "Tumbler (preferably Chilled)",
        "method": "Build, Stir",
        "ice": "Cubed",
        "garnish": "Orange wedge"
      },
      {
        "name": "White Lady",
        "ingredients": [
          "50ml Gin",
          "20ml Fresh Lemon juice",
          "15ml Cointreau",
          "5ml Simple Syrup",
          "10ml (pasteurized) Egg white"
        ],
        "glass": "Chilled Coupe",
        "method": "Dry Shake, Shake, Fine Strain",
        "ice": "NO",
        "garnish": "Lemon Peel"
      },
      {
        "name": "Clover Club",
        "ingredients": [
          "40ml Gin",
          "20ml Chambord",
          "20ml Fresh Lemon juice",
          "15ml Simple Syrup",
          "20ml (pasteurized) egg white"
        ],
        "glass": "Chilled Coupe",
        "method": "Dry Shake, Shake, Fine strain",
        "ice": "NO",
        "garnish": "Fresh Raspberries or Raspberry powder"
      },
      {
        "name": "Lynchburg Lemonade",
        "ingredients": [
          "40ml Jack Daniels Old No. 7",
          "20ml Cointreau",
          "20ml Fresh Lemon juice",
          "(Optional dash of Simple Syrup)",
          "Top Up (approximately 50ml) Sprite"
        ],
        "glass": "Highball",
        "method": "Shake, Fine Strain, Top up",
        "ice": "Cubed",
        "garnish": "Lemon Slice"
      },
      {
        "name": "Paloma",
        "ingredients": [
          "50ml Tequila",
          "30ml Fresh Pink Grapefruit juice",
          "15ml Fresh Lime juice",
          "15ml Agave Syrup",
          "1 pinch Salt",
          "Top up (approximately 60ml) Soda Water"
        ],
        "glass": "Highball / Collins",
        "method": "Shake, Fine Strain, Top up",
        "ice": "Cubed",
        "garnish": "Pink Grapefruit Wedge"
      },
      {
        "name": "Hemingway Daiquiri",
        "ingredients": [
          "45ml White Rum (or a Light Aged Rum)",
          "30ml Fresh Pink Grapefruit juice",
          "15ml Fresh Lime juice",
          "10ml Maraschino liqueur",
          "5ml Simple Syrup"
        ],
        "glass": "Chilled Coupe",
        "method": "Shake, Fine Strain",
        "ice": "NO",
        "garnish": "Lime Peel / Pink Grapefruit peel"
      },
      {
        "name": "Classic Mai Tai",
        "ingredients": [
          "25ml Anejo Rum",
          "25ml Spiced Rum",
          "20ml Cointreau",
          "20ml Fresh Lime juice",
          "10ml Orgeat"
        ],
        "glass": "Tumbler",
        "method": "Shake, Fine Strain",
        "ice": "Cubed",
        "garnish": "Mint sprig / Orange peel"
      },
      {
        "name": "Dark 'n' Stormy",
        "ingredients": [
          "50ml (Float) Spiced Rum",
          "20ml Fresh Lime juice",
          "100 Ginger Beer"
        ],
        "glass": "Highball",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Lime Wedge"
      },
      {
        "name": "Mojito",
        "ingredients": [
          "50ml White Rum (or a Light Aged Rum)",
          "20ml Fresh Lime Juice",
          "15ml Simple Syrup",
          "8-10 Fresh Mint Leaves",
          "30ml Soda"
        ],
        "glass": "Highball",
        "method": "Build",
        "ice": "Cubed",
        "garnish": "Fresh Mint Sprig"
      },
      {
        "name": "Mary Pickford",
        "ingredients": [
          "50ml White Rum",
          "30ml Fresh Pineapple Juice",
          "5ml Maraschino Liqueur",
          "1bsp Grenadine Syrup"
        ],
        "glass": "Chilled Coupe",
        "method": "Shake, Fine strain",
        "ice": "NO",
        "garnish": "Pineapple Wedge"
      },
      {
        "name": "Pina Colada (blended)",
        "ingredients": [
          "50ml Aged (Anejo) Rum",
          "60ml Pineapple Juice",
          "40ml Coconut Cream",
          "5-6 Chunks Fresh Pineapple",
          "5-6 Ice Cubes"
        ],
        "glass": "Hurricane / Highball",
        "method": "Blend",
        "ice": "NO",
        "garnish": "Pineapple Wedge / Pineapple Leaf"
      },
      {
        "name": "Pina Colada (shaken)",
        "ingredients": [
          "50ml Aged (Anejo) Rum",
          "90ml Pineapple juice",
          "40ml Coconut Cream"
        ],
        "glass": "Hurricane / Highball",
        "method": "Shake, Strain",
        "ice": "Crushed",
        "garnish": "Pineapple Wedge / Pineapple Leaf"
      }
    ]
