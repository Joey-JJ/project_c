// Description: LotterySystem component
// Adds a Ticket to the Tickets table in the database if user presses the button
//

import React from 'react'
import { supabase } from '../utils/supabaseClient'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { sessionContext } from '../context/sessionContext'
import { Profile } from '../Types/Profiles'
import { Ticket }from '../Types/Tickets'
import { createID } from '../utils/createID'

interface Props {
    profile: Profile;
}


const LotterySystem: React.FC<Props>= ({profile}) => {
    var Tickets: Ticket[] = [];
    const fetchTickets = async () => {
        const { data, error } = await supabase.from('tickets').select('*');
        if (error) console.log(error);
        if (data) {
            data.forEach((ticket: Ticket) => {
                Tickets.push(ticket);
            })
        }
    }
   

    const addTicket = async () => {
        fetchTickets();
        var ticket: Ticket = {
            id: createID(Tickets),
            user_id: profile.id,
            created_at: new Date().toISOString()
        }
        const { data, error } = await supabase.from('tickets').insert([ticket]).single();
        if (error) console.log(error);
        if (data) console.log(data);
    }


    return (
        <div>
            <button className="btn btn-primary"  onClick={addTicket}>Add Ticket</button>
        </div>
    )
}

export default LotterySystem;
